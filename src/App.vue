<template>
  <div id="app">
    <Navbar
      :isLogin="isLogin"
      @logout="logout"
    />

    <router-view
      @login="login"
      :isLogin="isLogin"
    />
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar,
  },
  data: function () {
    return {
      isLogin: false,
    }
  },
  methods: {
    selectMovie: function (data) {
      this.selectMovieId2 = data
    },
    logout: function () {
      this.isLogin = false
    },
    login: function () {
      this.isLogin = true
    },
  },

  created: function () {
    const username = localStorage.getItem('username')
    if (username) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
}
</script>


<style>

#app {
  width: 100%;
  height: 100%;
}

</style>
