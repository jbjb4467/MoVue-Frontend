<template>
  <div id="newMovies">

    <div id="slide">

      <h3 class="d-flex justify-content-start font-weight-bold" style="color: #ffffff">{{ group_title }}</h3>
      
      <carousel
        :navigationEnabled="true"
        :navigation-next-label="nextLabel"
        :navigation-prev-label="prevLabel"
        :paginationEnabled="false"
        :perPageCustom="[[0, 1],[650,2],[850,3],[1050,4],[1250,5],[1450,6],[1650,7],[1850,8],[2050,9],[2250,10]]"
      >
        <slide
          class="mt-3"
          v-for="(movie, idx) in movies"
          :key="idx"
        > 
        
          <div v-b-modal.modal-scrollable @click="selectMovie(movie.id)">

            <template v-if="movie.poster_path.slice(0,4) == 'http'">
              <img width="100%" id="imagemPosterSlide" :src="movie.poster_path" alt="">
            </template>

            <template v-else>
              <img width="100%" id="imagemPosterSlide" :src="'https://image.tmdb.org/t/p/w500'+movie.poster_path" alt="">
            </template>

          </div>

        </slide>
      </carousel>

    </div>

  </div>

</template>

<script>
import { Carousel, Slide } from "vue-carousel"
import axios from "axios"

const URL_PREFIX = 'https://image.tmdb.org/t/p/w500'

export default {
  name: "Movies",
  components: {
    Carousel,
    Slide,
  },
  props: {
    movies: {
      type: Array
    },
    group_title: {
      type: String
    },
    isLogin: {
      type: Boolean
    }
  },
  data () {
    return {
      showModal: false,
      prevLabel: '<i class="fas fa-angle-left" style="color:#ffffff;"></i>',
      nextLabel: '<i class="fas fa-angle-right" style="color:#ffffff;"></i>',
      URL_PREFIX,
      showLoading: true,
      movieDetail: Object,
    }
  },
  methods: {
    getMovieData: function () {
      axios.get(`https://3.139.100.250/movies/${this.movie.movie_id}`)
        .then((res) => {
          // console.log(res.data)
          this.movieDetail = res.data
        })
        .catch(err => console.log(err))
    },
    trueModal: function () {
      if (this.isLogin === true) {
        this.$store.dispatch('trueModal')
      }
    },
    selectMovie: function (movieId) {
      this.$store.dispatch('selectMovie', movieId)
    },
  },
}
</script>

<style>
#imagemPosterSlide:hover {
  transform: scale(1.1);
  cursor: pointer;
}
#slide {
  width: 90%;
  height: 100%;
  text-align: center;
  margin: auto;
}
#newMovies {
  width: 100%;
  text-align: center;
  margin: auto;
}
#imagemPosterSlide {
  border-radius: 15px;
  transition: 0.5s;
  height: 300px;
  margin-bottom: 20px;
  width: 200px;
}
#imagemPosterSlide:hover {
  transform: scale(1.1);
  cursor: pointer;
}
.VueCarousel-navigation-button[data-v-453ad8cd] {
  color: #e9e9e9 !important;
  outline: none !important;
}

@media only screen and (max-width: 599px) {
  #imagemPosterSlide {
    height: 150px;
    width: 100px;
  }
}

</style>