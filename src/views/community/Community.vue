<template>
  <div class="bgimg" :style="{ 'background-image' : `url(${backgroundUrl})` }">
    <div class="container list">
      <h1>{{ categoryName }}</h1>
      <b-table
        style="background: rgba(0, 0, 0, 0.7 ); color: white;"
        striped
        hover
        :fields="fields"
        :items="articles"
        id="my-table"
        :per-page="perPage"
        :current-page="currentPage"
        @row-clicked="myRowClickHandler"
      >
      </b-table>

      <button class="btn btn-light"><router-link class="dropdown-item p-2" :to="{ name: 'CreateArticle', params: 'category' }">추가하기</router-link></button>
      <div class="mt-3 overflow-auto">
        <b-pagination
          v-model="currentPage"
          pills
          :total-rows="rows"
          align="center"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import backgroundUrl1 from "@/assets/movieimg/1.jpg"
import backgroundUrl2 from "@/assets/movieimg/2.jpg"
import backgroundUrl3 from "@/assets/movieimg/3.jpg"
import backgroundUrl4 from "@/assets/movieimg/4.jpg"
import backgroundUrl5 from "@/assets/movieimg/5.jpg"
import backgroundUrl6 from "@/assets/movieimg/6.jpg"
import backgroundUrl7 from "@/assets/movieimg/7.jpg"
import backgroundUrl8 from "@/assets/movieimg/8.jpg"
import backgroundUrl9 from "@/assets/movieimg/9.jpg"
import backgroundUrl10 from "@/assets/movieimg/10.jpg"
import axios from 'axios'
import _ from 'lodash'


export default {
  name: 'Community',
  data: function () {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          key: 'id',
          sortable: true,
          label: '글번호',
        },
        {
          key: 'title',
          label: '제목',
        },
        {
          key: 'username',
          label: 'ID',
        },
      ],
      imgarray: [backgroundUrl1, backgroundUrl2, backgroundUrl3, backgroundUrl4, backgroundUrl5, backgroundUrl6, backgroundUrl7, backgroundUrl8, backgroundUrl9, backgroundUrl10],
      articles: [],
      contentDetail: '',
    }
  },
  watch: {
    category: function (newVal) {
      const config = this.setToken()
      axios.get(`http://3.21.166.3/community/${newVal}/article/`, config)
        .then((res) => {
          this.articles = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  computed: {
    category: function () {
      return this.$route.params.category
    },
    categoryName: function () {
      if (this.category === 1) {
        return '자유 게시판'
      } else if (this.category === 2) {
        return '영화추천 게시판'
      } else {
        return 'Q&A 게시판'
      }
    },
    rows: function () {
      return this.articles.length
    },
    backgroundUrl: function () {
      const randomNum = _.sampleSize(_.range(0, 10), 1)
      return this.imgarray[randomNum]
    }
  },
  methods: {
    myRowClickHandler(row) {
      this.$router.push({name: 'ArticleDetail', params: {'article_id': row.id }})
    },
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
      return config
    },
    getArticles: function () {
      const config = this.setToken()
      axios.get(`http://3.21.166.3/community/${this.category}/article/`, config)
        .then((res) => {
          this.articles = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getContentDetail: function (article_id) {
      this.$router.push({name: 'ArticleDetail', params: {'article_id': article_id }})
    },
    // 삭제
  },
  created: function () {
    if (localStorage.getItem('jwt')) {
      this.getArticles()
    } else {
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style>
#app > div > div > div > ul > li.page-item.active > button {
  background-color: #1f1f1f;
  border-color: #1f1f1f;
  color: #ffffff;
}
#app > div > div > div > ul > li > button {
  color: #1f1f1f;
}

.list {
  color: #f4f4f4;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 8rem;
  position: relative;
  z-index: 2;
}

.bgimg {
  width: 100%;
  height: 100%;
  position: relative;
  background: no-repeat center center/cover;
}

.bgimg::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 120px 100px 250px #000000, inset -120px -100px 250px #000000;
}

</style>