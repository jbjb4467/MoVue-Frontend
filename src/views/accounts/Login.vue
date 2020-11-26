<template>
  <div class="bgimg" :style="{ 'background-image' : `url(${backgroundUrl})` }">
    
    <div class="login">
      
      <div class="d-flex justify-content-between align-items-stretch mb-2" style="width: 100%;">
        
        <h5 class="mb-0">로그인</h5>
        <p style="color: rgba(213,213,213,0.7); font-size: 14px" class="mb-0">아직 저희 회원이 아니신가요?</p>
      
      </div>
      
      <form class="justify-content-center mt-1" @submit.prevent="login">
        
        <input class="form-control mr-sm-2" style="width: 100%; height: 45px; padding: 10px;" placeholder="아이디를 입력해주세요" type="text" id="username" v-model="credentials.username">
        <input class="form-control mr-sm-2" style="width: 100%; height: 45px; padding: 10px;" placeholder="비밀번호를 입력해주세요" type="password" id="password" v-model="credentials.password" @keypress.enter="login">
        
        <button @click="login" type="button" class="btn btn-danger mt-3" style="width: 100%;">로그인</button>
      </form>
    
          
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
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'Login',
  data: function () {
    return {
      imgarray: [backgroundUrl1, backgroundUrl2, backgroundUrl3, backgroundUrl4, backgroundUrl5, backgroundUrl6, backgroundUrl7, backgroundUrl8, backgroundUrl9, backgroundUrl10],
      credentials: {
        username: '',
        password: '',
      },
    }
  },
  computed: {
    backgroundUrl: function () {
      const randomNum = _.sampleSize(_.range(0, 10), 1)
      return this.imgarray[randomNum]
    }
  },
  methods: {
    login: function () {
      axios.post('http://3.139.100.250/accounts/api-token-auth/', this.credentials,)
        .then((res) => {
          const username = res.config.data.split('"')[3]
          localStorage.setItem('jwt', res.data.token)
          localStorage.setItem('username', username)
          
          this.$emit('login')
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
          this.newAlert()
        })
    },
    newAlert: function () {
      this.$fire({
        title: "아이디나 비밀번호를 확인해주세요.",
        text: "",
        type: "error",
      }).then(r => {
        console.log(r.value);
      });
    }
  },
}
</script>

<style>

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

.login {
  color: #f4f4f4;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  width: 300px;
  margin: 0;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

input::placeholder {
  color: lightgrey !important;
}

</style>