<template>
  <div id="createArticle" class="background w3-display-middle">
    <div>
      <br>
      <h1 class="font-weight-bolder text-center mb-0">Update Article</h1>
      <br>
    </div>
    <form class="container" @submit.prevent="updateArticle">
      <div class="form-group">
        <label for="exampleInputEmail1">Title</label>
        <input type="text" class="form-control name2" id="exampleInputEmail1" aria-describedby="emailHelp" v-model.trim="pickArticle.title">
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Content</label>
        <textarea class="form-control message2" id="exampleFormControlTextarea1" rows="5" v-model.trim="pickArticle.content"></textarea>
      </div>
      <button id="input-submit" class="w3-bar-item w3-button tablink " @click="updateArticle"><i class="fa fa-plane w3-margin-right"></i>Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UpdateArticle',
  data: function () {
    return {
      pickArticle: '',
    }
  },
  computed: {
    category: function () {
      return this.$route.params.category
    },
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
    updateArticle: function () {
      const config = this.setToken()
      axios.put(`http://3.21.166.3/community/${this.category}/article/${this.pickArticle.id}/`, {'title': this.pickArticle.title, 'content': this.pickArticle.content}, config)
        .then((res) => {
          console.log(res)
          this.$router.push({name: 'ArticleDetail', params: {'category': this.category, 'article_id': this.pickArticle.id }})
        })
        .catch(err => console.log(err))
    },
  },
  created: function () {
    this.pickArticle = this.$route.params.article
  },
}
</script>

<style>


</style>