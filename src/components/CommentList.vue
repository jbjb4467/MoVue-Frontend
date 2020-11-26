<template>
  <div>  
    <div class="margin d-flex justify-content-between" 
      v-for="(comment, idx) in comments" 
      :key="idx">
      <template v-if="idx !== updateIdx">
        <div>
          {{ comment.username }}
        </div>
        
          {{ comment.content }}
        <div>
          <i class="fas fa-pen-nib"></i>
          {{ comment.created_at | formatDate }}
          <i class="fas fa-hammer"></i>
          {{ comment.updated_at | formatDate }}
          <template v-if="comment.username == username">
            <button
            type="button" class="btn pull-right btn-light btn-sm"
            @click="deleteComment(comment, idx)"
            style="margin-left:15px">Delete</button>
            <button type="button" class="btn pull-right btn-light btn-sm" @click="commentIdx(comment, idx)">Update</button>
          </template>
        </div>
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
import moment from 'moment'
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
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format('YY/MM/DD HH:MM')
      }
    }
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
      axios.get(`https://3.139.100.250/community/article/${this.articleId}/comment/`, config)
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
      axios.delete(`https://3.139.100.250/community/article/${this.articleId}/comment/${comment.id}`, config)
        .then(res => {
          console.log(res)
        })
        .catch(err=> console.log(err))
      this.comments.splice(idx,1)
    },
    updateComment: function () {
      const config = this.setToken()
      axios.put(`https://3.139.100.250/community/article/${this.articleId}/comment/${this.updateCommentIdx}/`,
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

<style scoped>

.margin{
    margin-left: 20px;
    margin-right: 20px;
}

</style>