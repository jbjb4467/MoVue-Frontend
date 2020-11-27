<template>
  <div id="createArticle" class="background w3-display-middle">
    <div>
      <br>
      <h1 class="font-weight-bolder text-center mb-0">New Article</h1>
      <br>
    </div>
    <form class="container" @submit.prevent>
      <div class="form-group">
        <label for="exampleInputEmail1">Title</label>
        <input type="text" class="form-control name2" id="exampleInputEmail1" aria-describedby="emailHelp" v-model.trim="title">
      </div> 
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Content</label>
        <textarea class="form-control message2" id="exampleFormControlTextarea1" rows="5" v-model.trim="content"></textarea>
      </div>
      <button id="input-submit" class="w3-bar-item w3-button tablink " @click="createArticle"><i class="fa fa-plane w3-margin-right"></i>Submit</button>
    </form>
  </div>
</template>

<script>
import axios from'axios'

export default {
  name: 'CreateArticle',
  data: function () {
    return {
      content: '',
      title: '',
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
    createArticle: function () {
      const config = this.setToken()

      const item = {
        content: this.content,
        title: this.title,
      }
        if (item.content) {
           axios.post(`http://127.0.0.1:8000/community/${this.category}/article/`, item, config)
            .then((res) => {
              console.log(res)
              this.$router.push({ name: 'Community' })
              })
            .catch((err) => {
              console.log(err)
              })
        }
    },
  }
}
</script>

<style>

#createArticle {
  padding-top: 8rem;
  position: absolute;
  width: 100%;
  height: 100%;
}

.name2 {
  background: rgba(255, 255, 255, 0.4) url(http://luismruiz.com/img/gemicon_name.png) no-repeat scroll 16px 16px; 
  padding-left:45px;
}

.message2 {
  background: rgba(255, 255, 255, 0.4) url(http://luismruiz.com/img/gemicon_message.png) no-repeat scroll 16px 16px;
  padding-left:45px;
}

.background {
  z-index: 1;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 120px 100px 250px #000000, inset -120px -100px 250px #000000;
  background-image: url("../../assets/bg-7.jpg");
  min-height: 100%;
  background-position: center;
  background-size: cover;
}
</style>