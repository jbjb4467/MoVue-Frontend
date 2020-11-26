<template>
  <div>
    <table class="table my-5">
      <tbody>
        <tr v-for="(review, idx) in reviews" :key="idx" style="width: 100%; color: white;">
          <template v-if="idx !== updateIdx">
            <th scope="row">{{ review.username }}</th>
            <td>{{ review.comment }}</td>
            <td>{{ review.movie_title }}</td>
            <td style="color: white;"><i class="fas fa-star" style="color: #d9534f;"></i>×{{ review.rank/2 }}</td>
            <td>{{ review.updated_at | formatDate }}</td>
            
            <td>
              <template v-if="review.username == username">
                <i class="fas fa-pencil-alt btn btn-light" @click="updateReview(idx)"></i>
                <i class="fas fa-times-circle btn btn-light" @click="deleteReview(review, idx)"></i>
              </template>
            </td>
          </template>
          
          <template v-else>
            <UpdateReview
              :updateReview="review"
              @update-review="changeReview"
            />
          </template>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- <div>
    <p v-for="(review, idx) in reviews" :key="idx">
      <template v-if="idx !== updateIdx">
        {{ review.username }}
        {{ review.title }}
        {{ review.content }}

        <template v-if="review.username == username">
          <button @click="deleteReview(review, idx)">삭제</button>
          <button @click="updateReview(idx)">수정</button>
        </template>

      </template>

      <template v-else>
        <UpdateReview
          :updateReview="review"
          @update-review="changeReview"
        />
      </template>
    </p>
  </div>  -->
</template>

<script>
import axios from 'axios'
import moment from 'moment'

import UpdateReview from '@/components/UpdateReview'

export default {
  name: 'ReviewList',
  components: {
    UpdateReview,
  },
  data: function () {
    return {
      reviews: [],
      updateIdx: -1,
      username: '',
    }
  },
  computed: {
    reviewMovieId: function () {
      return this.$store.state.selectedMovie
    }
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format('YYYY/MM/DD')
      }
    }
  },
  watch: {
    reviewMovieId: function (newVal) {
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
      axios.get(`http://3.139.100.250/movies/${newVal}/review/`, config)
        .then((res) => {
          this.reviews = res.data
        })
        .catch(err => console.log(err))
    },
    newReview: function (newVal) {
      console.log(newVal)
      this.reviews.push(newVal)
    },
  },
  props: {
    newReview: {
      type: Object
    },
  },
  created: function () {
    this.username = localStorage.getItem('username')
    const token = localStorage.getItem('jwt')
    const config = {
      headers: {
        Authorization: `JWT ${token}`
      }
    }
    axios.get(`http://3.139.100.250/movies/${this.$store.state.selectedMovie}/review/`, config)
      .then((res) => {
        this.reviews = res.data
        console.log(res.data)
      })
      .catch(err => console.log(err))
    
  },
  methods: {
    changeReview: function (data) {
      this.reviews[this.updateIdx] = data
      this.updateIdx = -1
    },
    updateReview: function (idx) {
      this.updateIdx = idx
    },
    deleteReview: function (review, idx) {
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
      axios.delete(`http://3.139.100.250/movies/${this.$store.state.selectedMovie}/review/${review.id}`, config)
        .then((res => {
          console.log(res)
        }))
        .catch(err => console.log(err))
      this.reviews.splice(idx,1)
    },
  },
}
</script>

<style>

</style>