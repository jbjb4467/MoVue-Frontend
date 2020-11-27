<template>
  <div class="bgimg" :style="{ 'background-image' : `url(${backgroundUrl})` }">
    <div class="container article">
      <p>{{ articleId }}번 게시글</p>
      <hr>
      <div class="d-flex">
        <p style="width:100px; margin-bottom: 0;"><b>제목</b></p>
        <h4 class="text-left ml-4">{{ article.title }}</h4>
      </div>
      <div class="d-flex">
        <p style="width:100px; margin-bottom: 0;"><b>글쓴이</b></p>
        <p class="text-left ml-4">{{ article.username }}</p>
      </div>
      <div class="d-flex">
        <p style="width:100px; margin-bottom: 0;"><b>내용</b></p>
        <p class="text-left ml-4">{{ article.content }}</p>
      </div>
      <div>
        <p class="float-right"><i class="fas fa-pen-nib"></i> {{ article.updated_at | formatDate }}</p>
      </div>
      <div>
        <p class="float-right"><i class="fas fa-hammer"></i> {{ article.created_at | formatDate }}</p>
      </div>

  <!-- v-if="article.user ===" -->
  
      <template v-if="article.username == username">
        <div>
          <button class="btn btn-light btn-sm" @click="updateArticle(article)" >update</button>
          <button class="btn btn-light btn-sm" @click="deleteArticle(article)">delete</button>
        </div>
      </template>

      <hr>
      <h4 class="font-weight-bolder text-center mb-0">Comment List</h4>
      <hr>
      <CommentList
        :category="category"
        :articleId="articleId"
        :newComment="newComment"
      />
      <form @submit.prevent="createComment">
        <input class="form-control form-control-sm" v-model="commentContent" type="text" placeholder="댓글을 입력해주세요.">
      </form>

      <!-- <b-input-group class="mt-3">
        <template #append>
          <b-button @click="createComment">Add</b-button>
        </template>
        <b-form-input @keypress.enter="createComment" v-model="commentCreated"></b-form-input>
      </b-input-group> -->
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

import _ from 'lodash'
import CommentList from '@/components/CommentList'
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'CommunityDetail',
  data: function () {
    return {
      imgarray: [backgroundUrl1, backgroundUrl2, backgroundUrl3, backgroundUrl4, backgroundUrl5, backgroundUrl6, backgroundUrl7, backgroundUrl8, backgroundUrl9, backgroundUrl10],
      articleId: '',
      article: '',
      commentContent: '',
      newComment:   {},
      username: '',
    }
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format('YY.MM.DD hh:mm')
      }
    }
  },
  computed: {
    category: function () {
      return this.$route.params.category
    },
    backgroundUrl: function () {
      const randomNum = _.sampleSize(_.range(0, 10), 1)
      return this.imgarray[randomNum]
    }
  },
  components: {
    CommentList
  },
  created: function () {
    this.username = localStorage.getItem('username')
    this.articleId = this.$route.params.article_id
    this.getArticle()
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
      return config
    },
    getArticle: function () {
      const config = this.setToken()
      axios.get(`http://3.21.166.3/community/${this.category}/article/${this.articleId}`, config)
        .then((res) => {
          this.article = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteArticle: function (article) {
      const config = this.setToken()
      axios.delete(`http://3.21.166.3/community/${this.category}/article/${article.id}/`, config)
        .then(() => {
          this.$router.push({name: 'Community'})
        })
        .catch(err => console.log(err))
    },
    updateArticle: function (article) {
      this.$router.push({name: 'UpdateArticle',
      params: { article }})
    },
    createComment: function () {
      const config = this.setToken()
      axios.post(`http://3.21.166.3/community/${this.category}/article/${this.articleId}/comment/`,{ content: this.commentContent },config)
        .then((res) => {
          this.newComment = res.data
          this.commentContent = ''
        })
        .catch(err => { 
          console.log(err)
        })
    },
  }
}
</script>

<style scoped>

#app > div {
  color: white;
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
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 120px 100px 250px #000000, inset -120px -100px 250px #000000;
}

.article {
  color: #f4f4f4;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  padding-top: 8rem;
  position: relative;
  z-index: 2;
}

</style>