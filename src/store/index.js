import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedMovie: 0,
  },
  mutations: {
    SELECT_MOVIE: function (state, payload) {
      state.selectedMovie = payload
    }
  },
  actions: {
    selectMovie: function ({ commit }, movieId) {
      commit('SELECT_MOVIE', movieId)
    },
  },
})