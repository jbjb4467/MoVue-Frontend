<template>
  <b-modal
    id="modal-scrollable"
    scrollable
    :title="movieDetail.title"
    size="lg"  
  >

    <div class="video-container">
      <iframe :src="youtubeURL" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="" id="descriptionsContainer">
      <h4 class="d-flex justify-content-between mt-3">
          <b-badge class="d-flex align-items-center" variant="danger">{{ movieDetail.release_date }}</b-badge>
          <b-form-rating style="height: 100%; background-color: transparent; border: none;" variant="danger" id="rating-lg" size="lg" inline v-model="voteAverage" readonly precision=""></b-form-rating>
      </h4>
      <h4>
        <b-badge 
          v-for="(genre, idx) in movieDetail.genres"
          :key="idx"
          variant="warning"
          class="mr-2 mt-2">
          {{ genre | findGenre }}
        </b-badge>
      </h4>
      <p class="my-3">
        {{ movieDetail.overview }}
      </p>
    </div>

    <div id="slide">

      <h4 style="color: #ffffff">이런 영화 어때요</h4>
      
      <carousel
        :navigationEnabled="true"
        :paginationEnabled="false"
        :perPageCustom="[[1050,2],[1250,3]]"
      >
        <slide
          class="mt-3"
          v-for="(movie, idx) in similar_movies"
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


    <ReviewForm
      @get-new-review="getNewReview"
    />
    <ReviewList
      :newReview="newReview"
    />


  </b-modal>
</template>

<script>
import axios from 'axios'
import ReviewForm from '@/components/ReviewForm'
import ReviewList from '@/components/ReviewList'
import { Carousel, Slide } from "vue-carousel"

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'
// const YOUTUBE_API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
const YOUTUBE_API_KEY = '1'
const MOVIE_DB_API_KEY = '8c896d14651cf3bca1379eadbe278379'
const MOVIE_DB_API_URL_SIMILAR = `https://api.themoviedb.org/3/movie`


export default {
  name: 'MovieModal',
  components: {
    Carousel,
    Slide,
    ReviewForm,
    ReviewList,
  },
  data: function () {
    return {
      movieDetail: {},
      youtubeURL: 'https://www.youtube.com/embed/',
      similar_movies: [],
      newReview: {},
      reviews: [],
    }
  },
  computed: {
    modalMovieId: function () {
      return this.$store.state.selectedMovie
    },
    voteAverage: function () {
      return this.movieDetail.vote_average/2
    },
  },
  watch: {
    modalMovieId: function (newVal) {
      this.youtubeURL = 'https://www.youtube.com/embed/'
      axios.get(`https://3.139.100.250/movies/${newVal}`)
        .then((res) => {
          this.movieDetail = res.data
          axios.get(MOVIE_DB_API_URL_SIMILAR+'/'+newVal+'/similar', {
            params: {
              api_key: MOVIE_DB_API_KEY,
              language: 'ko-KR',
              page: 1
            }
          })
            .then((res) => {
              this.similar_movies = res.data.results
            })
            .catch(err => console.log(err))
          const token = localStorage.getItem('jwt')
          const config = {
            headers: {
              Authorization: `JWT ${token}`
            }
          }
          axios.get(`https://3.139.100.250/movies/${newVal}/review/`, config)
            .then((res) => {
              this.reviews = res.data
            })
            .catch(err => console.log(err))
          const query = this.movieDetail.original_title + ' trailer'
          axios.get(YOUTUBE_API_URL, {
            params: {
              key: YOUTUBE_API_KEY,
              part: 'snippet',
              type: 'video',
              q: query,
              maxResults: 1,
            }
          })
            .then((res) => {
              this.youtubeURL = `https://www.youtube.com/embed/${res.data.items[0].id.videoId}`
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
      // this.$store.dispatch('selectMovie', 0)
    },
  },
  methods: {
    selectMovie: function (data) {
      this.$store.dispatch('selectMovie', data)
    },
    getNewReview: function (data) {
      this.newReview = data
    },
  },
  filters: {
    findGenre: function (value) {
      if (value === 12) {
        return '모험'
      } else if (value === 14) {
        return '판타지'
      } else if (value === 14) {
        return '애니메이션'
      } else if (value === 16) {
        return '드라마'
      } else if (value === 18) {
        return '공포'
      } else if (value === 27) {
        return '액션'
      } else if (value === 28) {
        return '코미디'
      } else if (value === 35) {
        return '역사'
      } else if (value === 36) {
        return '서부'
      } else if (value === 53) {
        return '스릴러'
      } else if (value === 80) {
        return '범죄'
      } else if (value === 99) {
        return '다큐멘터리'
      } else if (value === 878) {
        return 'SF'
      } else if (value === 9648) {
        return '미스터리'
      } else if (value === 10402) {
        return '음악'
      } else if (value === 10749) {
        return '로맨스'
      } else if (value === 10751) {
        return '가족'
      } else if (value === 10752) {
        return '전쟁'
      } else if (value === 10770) {
        return 'TV 영화'
      }
    },
  },
}
</script>

<style>

#modal-scrollable___BV_modal_footer_, #modal-scrollable___BV_modal_body_, #modal-scrollable___BV_modal_header_ {
  background-color: #1f1f1f !important;
  color: #ffffff;
}

.video-container {
  position: relative;
  padding-top: 56.25%
}

.video-container > iframe {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

</style>