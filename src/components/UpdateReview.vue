<template>
  <b-card style="background-color: transparent; border: none;">
    <b-form-group
      label="영화리뷰 수정하기"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0"
    >
      <b-form-rating inline no-border size="lg" v-model="newRank" variant="danger" class="mb-2" style="background-color: transparent;"></b-form-rating>
      <b-form-group
        label-for="comment"
      >
        <b-form-input
          id="comment"
          placeholder="한줄평을 써주세요"
          v-model="reviewComment"
          @keypress.enter="submitReview"
        ></b-form-input>
      </b-form-group>
    </b-form-group>
  </b-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UpdateReview',
  data: function () {
    return {
      reviewComment: '', 
      newRank: 5.0,
    }
  },
  mounted: function () {
    this.reviewComment = this.updateReview.comment
    this.newRank = this.updateReview.rank/2
  },
  props: {
    updateReview: {
      type: Object
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
    submitReview: function () {
      const config = this.setToken()
      const data = {
        'comment': this.reviewComment,
        'rank': this.newRank*2
      }
      axios.put(`http:///127.0.0.1:8000/movies/${this.updateReview.movie_id}/review/${this.updateReview.id}/`, data, config)
        .then((res) => {
          this.$emit('update-review',res.data)
        })
        .catch(err => console.log(err))
    },
  },

}
</script>

<style>

</style>