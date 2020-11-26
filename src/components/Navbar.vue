<template>
  <nav class="navbar navbar-expand-lg fixed-top py-3">
    
    <div class="container">
        <template v-if="isLogin">
          <router-link class="nav-link font-weight-bold" :to="{ name: 'Home' }" @click.native="newAlert"><span class="font-weight-bold">MoVue</span></router-link>
        </template>
        <template v-else>
          <router-link class="nav-link font-weight-bold" :to="{ name: 'Login' }" @click.native="newAlert"><span class="font-weight-bold">MoVue</span></router-link>
        </template>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-bars" style="color:#ffffff;"></i></button>
        
        <div class="collapse navbar-collapse " id="navbarSupportedContent">

          <ul class="navbar-nav mr-auto">

            <li class="nav-item dropdown">
              
              <a class="nav-link dropdown-toggle font-weight-bold" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">커뮤니티</a>
              
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                
                <router-link @click.native="newAlert" class="dropdown-item" :to="{ name: 'Community' }"><span class="font-weight-bold">게시판1</span></router-link>
              
              </div>
            
            </li>

            <li class="nav-item dropdown">
              
              <a class="nav-link dropdown-toggle font-weight-bold" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">계정</a>
              
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                
                <template v-if="!isLogin">
                  
                  <router-link class="dropdown-item" :to="{ name: 'Login' }"><span class="font-weight-bold">로그인</span></router-link>
                  <router-link class="dropdown-item" :to="{ name: 'Signup' }"><span class="font-weight-bold">회원가입</span></router-link>

                </template>

                <template v-else>

                  <router-link class="dropdown-item" to="#" @click.native="logout"><span class="font-weight-bold">로그아웃</span></router-link>                

                </template>
              
              </div>
            
            </li>

          </ul>

          <div class="d-flex" @click="newAlert">
            <vue-bootstrap-typeahead
              v-model="movieSearch"
              :data="movieTitles"
              :minMatchingChars="minMatchingChars"
              placeholder="영화를 검색해주세요..."
              @hit="selectedMovie = $event"
            />
            <i class="fas fa-search fa-2x" @click="selectMovie(searchId)" style="color: white; margin-left: 10px; margin-top: 3px;" v-b-modal.modal-scrollable></i>
            <!-- <button class="btn btn-danger" @click="selectMovie(searchId)" v-b-modal.modal-scrollable>검색하기</button> -->
          </div>
        </div>

      </div>
  </nav>
</template>

<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import axios from 'axios'
import $ from 'jquery'
export default {
  name: 'Navbar',
  data: function () {
    return {
      movies: [],
      movieTitles: [],
      minMatchingChars: 1,
      movieSearch: '',
      selectedMovie: null,
      searchId: 0
    }
  },
  components: {
     VueBootstrapTypeahead,
  },
  props: {
    isLogin: {
      type: Boolean
    }
  },
  watch: {
    selectedMovie: function (newVal) {
      axios.get(`http://3.139.100.250/movies/title/${newVal}/`)
        .then((res) => {
          this.searchId = res.data.id
          this.selectMovie(this.searchId)
          this.trueModal()
          console.log(this.$store.state.showModal)
        })
        .catch(err => console.log(err))
    }
  },
  methods: {
    selectMovie: function (movieId) {
      this.$store.dispatch('selectMovie', movieId)
    },
    logout: function () {
      localStorage.removeItem('jwt')
      localStorage.removeItem('username')
      this.$emit('logout')
      this.$router.push({ name: 'Login' })
    },
    newAlert: function () {
      if (this.isLogin === false) {
        this.$fire({
          title: "로그인을 해주세요!",
          text: "",
          type: "error",
          // timer: 3000
        }).then(r => {
          console.log(r.value);
        });
      }
    },
  },
  created: function () {
    axios.get('http://3.139.100.250/movies/')
      .then((res) => {
        const movies = res.data
        this.movies = movies
        const movieTitles = []
        movies.forEach(function (movie) {
          movieTitles.push(movie.title)
        })
        this.movieTitles = movieTitles
      })
      .catch(err => console.log(err))
  },
  mounted () {
    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 10) {
        $('.navbar').addClass('active')
      } else {
        $('.navbar').removeClass('active')
      }
    })
    $(document).ready(function () {
      $("#navbarSupportedContent > div > div.list-group.shadow.vbt-autcomplete-list > a").click(function () {
        $("#myModal").modal('show')
      })
    })
  },
}

</script>

<style scoped>

.navbar {
    transition: all 0.4s;
}

.navbar .nav-link {
    color: #ffffff;
}

.navbar .nav-link:hover,
.navbar .nav-link:focus {
    color: #ffffff;
    text-decoration: none;
}

.navbar .navbar-brand {
    color: #ffffff;
}


/* Change navbar styling on scroll */
.navbar.active {
    background: #1f1f1f;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar.active .nav-link {
    color: #ffffff;
}

.navbar.active .nav-link:hover,
.navbar.active .nav-link:focus {
    color: #ffffff;
    text-decoration: none;
}

.navbar.active .navbar-brand {
    color: #ffffff;
}

/* Change navbar styling on small viewports */
@media (max-width: 991.98px) {
    .navbar {
        background: #1f1f1f;
    }

    .navbar .navbar-brand, .navbar .nav-link {
        color: #ffffff;
    }
}

input::placeholder {
  color: lightgrey;
}

</style>