<template>
  <div id="homepage">

    <Movies
      v-if="review_recommend.length!==0"
      :isLogin="isLogin"
      :movies="review_recommend"
      @click.native="newAlert"
      group_title="리뷰 기반 추천 컨텐츠"
      class="mt-5"
    />
    <Movies
      :isLogin="isLogin"
      :movies="toprated_movies"
      @click.native="newAlert"
      group_title="TMDb 최고 평점 컨텐츠"
      class="mt-5"
    />

    <Movies
      :isLogin="isLogin"
      :movies="popular_movies"
      @click.native="newAlert"
      group_title="TMDb 인기 컨텐츠"
      class="mt-5"
    />
    
    <Movies
      :isLogin="isLogin"
      :movies="upcoming_movies"
      @click.native="newAlert"
      group_title="개봉 예정 컨텐츠"
      class="mt-5"
    />

    <Movies
      :isLogin="isLogin"
      :movies="nowplaying_movies"
      @click.native="newAlert"
      group_title="현재 상영 중 컨텐츠"
      class="mt-5"
    />
    <MovieModal
      :isLogin="isLogin"
    />

  </div>
</template>

<script>
import axios from 'axios'
import Movies from '@/components/Movies'
import MovieModal from '@/components/MovieModal'


const MOVIE_DB_API_URL_POPULAR = 'https://api.themoviedb.org/3/movie/popular'
const MOVIE_DB_API_URL_UPCOMING = 'https://api.themoviedb.org/3/movie/upcoming'
const MOVIE_DB_API_URL_TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated'
const MOVIE_DB_API_URL_GET_NOW_PLAYING = 'https://api.themoviedb.org/3/movie/now_playing'
const MOVIE_DB_API_KEY = '8c896d14651cf3bca1379eadbe278379'

export default {
  name: 'Home',
  data: function () {
    return {
      popular_movies: [],
      upcoming_movies: [],
      toprated_movies: [],
      nowplaying_movies: [],
      review_recommend: [],
    }
  },
  props: {
    isLogin: {
      type: Boolean
    },
  },
  components: {
    Movies,
    MovieModal,
  },
  created: function () {
    console.log(this.review_recommend)
    axios.get(MOVIE_DB_API_URL_POPULAR, {
      params: {
        api_key: MOVIE_DB_API_KEY,
        language: "ko-KR",
        page: 1,
        region: 'kr'
      }
    })
    .then((res) =>{
      this.popular_movies = res.data.results
    })
    .catch(err => console.log(err))
    axios.get(MOVIE_DB_API_URL_UPCOMING, {
      params: {
        api_key: MOVIE_DB_API_KEY,
        language: "ko-KR",
        page: 1,
        region: 'kr'
      }
    })
    .then((res) =>{
      this.upcoming_movies = res.data.results
    })
    .catch(err => console.log(err))
    axios.get(MOVIE_DB_API_URL_TOP_RATED, {
      params: {
        api_key: MOVIE_DB_API_KEY,
        language: "ko-KR",
        page: 1,
        region: 'kr'
      }
    })
    .then((res) =>{
      this.toprated_movies = res.data.results
    })
    .catch(err => console.log(err))
    axios.get(MOVIE_DB_API_URL_GET_NOW_PLAYING, {
      params: {
        api_key: MOVIE_DB_API_KEY,
        language: "ko-KR",
        page: 1,
        region: 'kr'
      }
    })
    .then((res) =>{
      this.nowplaying_movies = res.data.results
    })
    .catch(err => console.log(err))
    const token = localStorage.getItem('jwt')
    const config = {
      headers: {
        Authorization: `JWT ${token}`
      }
    }
    axios.get('http://127.0.0.1:8000/movies/review_recommend/',config)
      .then((res) => {
        this.review_recommend = res.data
      })
      .catch((err) => {
        console.log(err)
      })

  },
  methods: {
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
  }
}
</script>
<style scoped>

#homepage {
  margin-top: 8rem;
}

.text-small {
    font-size: 0.9rem !important;
}

body {
  background-color: #1f1f1f;
}

</style>