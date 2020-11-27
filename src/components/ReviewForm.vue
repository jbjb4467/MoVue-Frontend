<template>
  <b-card style="background-color: transparent; border: none;">
    <b-form-group
      label="한줄평 남기기"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0"
    >
      <b-form-rating inline no-border size="lg" v-model="halfRank" variant="danger" class="mb-2" style="background-color: transparent;"></b-form-rating>
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
  name: 'ReviewForm',
  props: {
    updateTitle: {
      type: String
    },
    updateContent: {
      type: String
    },
    updateRank: {
      type: Number
    },
  },
  mounted: function () {
    this.reviewComment = this.updateTitle
    this.newReview = this.updateRank
  },
  data: function () {
    return {
      halfRank: 5,
      reviewComment: '', 
      newReview: '',
    }
  },
  methods: {
    storeReview: function (data) {
      this.$store.dispatch('storeReview',data)
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
    submitReview: function () {
      const config = this.setToken()
      const movie_id = this.$store.state.selectedMovie
      const data = {
        'comment': this.reviewComment,
        'movie_id': movie_id,
        'rank': this.halfRank*2
      }
      axios.post(`http://127.0.0.1:8000/movies/${movie_id}/review/`,data, config)
        .then((res)=>{
          this.newReview = res.data
          this.$emit('get-new-review', this.newReview)
        })
        .catch((err)=> { console.log(err)
        })
      this.reviewComment = ''
      this.halfRank = ''

    }
  }
}
</script>

<style scoped>
  input::placeholder {
    color: lightgrey;
  }
  textarea::placeholder {
    color: lightgrey;
  }
</style>