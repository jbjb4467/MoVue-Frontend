<template>
  <div class="bgimg" :style="{ 'background-image' : `url(${backgroundUrl})` }">
    <div class="container list">
      <h1>커뮤니티</h1>
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
      <!-- <table class="table table-dark table-hover mt-3" style="background: rgba(0, 0, 0, 0.7 );">
        <thead class="table-dark" style="background: rgba(0, 0, 0, 0.8);">
          <tr>
            <th scope="col">글번호</th>
            <th scope="col">제목</th>
            <th scope="col">ID</th>
          </tr>
        </thead>
        <tbody class="tbody-">
          <tr v-for="(article, idx) in articles" :key="idx">
            <th scope="row">{{ article.id }}</th>
            <td>
              <div @click="getContentDetail(article.id)">
                {{ article.title }}
              </div>
            </td>
            <td>
              <div @click="getContentDetail(article.id)">
                {{ article.username }}
              </div>
            </td>
          </tr>
        </tbody>
      </table> -->
      <button class="btn btn-light"><router-link class="dropdown-item p-2" :to="{ name: 'CreateArticle' }">추가하기</router-link></button>
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
  computed: {
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
      axios.get('http://127.0.0.1:8000/community/article/', config)
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
  width: 300px;
  padding-top: 8rem;
  position: relative;
  z-index: 2;
}

</style>