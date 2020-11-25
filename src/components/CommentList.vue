<template>
  <div> 
      <div class="margin d-flex justify-content-between" 
        v-for="(comment, idx) in comments" 
        :key="idx">
        <template v-if="idx !== updateIdx">
          {{ comment.username }}
          {{ comment.content }}
          {{ comment.created_at }}
          {{ comment.updataed_at }}
          <template v-if="comment.username == username">
            <button
            type="button" class="btn btn-light btn-sm"
            @click="deleteComment(comment, idx)"
            style="margin-left:15px">Delete</button>
            <button type="button" class="btn btn-light btn-sm" @click="commentIdx(comment, idx)">update</button>
          </template>
        </template>
 
        <template v-else>
          <form @submit.prevent="updateComment">
            <input type="text" v-model="updateCommentContent">
            <button>댓글달기</button>
          </form>
        </template>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CommentList',
  data: function () {
    return {
        comments: [],
        updateIdx: -1,
        updateCommentIdx: 0,
        updateCommentContent: '',
        username: '',
    }
  },
  watch: {
    newComment: function (newVal) {
      console.log(newVal)
      this.comments.push(newVal)
    },
  },
  props: {
    articleId: {
        type: [Number, String]
    },
    newComment: {
        type: Object
    },
  },
  methods: {
    commentIdx: function (comment, idx) {
      this.updateIdx = idx
      this.updateCommentIdx = comment.id
      this.updateCommentContent = comment.content

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
    getComment: function () {
      const config = this.setToken()
      axios.get(`http://127.0.0.1:8000/community/article/${this.articleId}/comment/`, config)
      .then((res) => {
        this.comments = res.data
        console.log(res.data)
        this.$emit('commentlist', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteComment: function (comment, idx) {
      const config = this.setToken()
      axios.delete(`http://127.0.0.1:8000/community/article/${this.articleId}/comment/${comment.id}`, config)
        .then(res => {
          console.log(res)
        })
        .catch(err=> console.log(err))
      this.comments.splice(idx,1)
    },
    updateComment: function () {
      const config = this.setToken()
      axios.put(`http://127.0.0.1:8000/community/article/${this.articleId}/comment/${this.updateCommentIdx}/`,
        { 'content': this.updateCommentContent }, config)
          .then((res) => {
            this.comments[this.updateIdx] = res.data
            console.log(res)
            this.updateIdx = -1
          })
          .catch(err => console.log(err))
    }
  },
  created: function () {
    this.username = localStorage.getItem('username')
    if (localStorage.getItem('jwt')) {
      this.getComment()
    } else {
      this.$router.push({name: 'Login'})
    }
  },
}
</script>

<style>

.margin{
    margin-left: 20px;
    margin-right: 20px;
}

</style>