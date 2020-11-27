<template>
  <div class="bgimg" :style="{ backgroundImage: `url(${backgroundUrl})`}" style="background: no-repeat center center/cover;">
    
    <div class="login">
      
      <div class="d-flex justify-content-between align-items-stretch mb-2" style="width: 100%;">
        <h5 class="mb-0">회원가입</h5>
        <!-- <div v-if="error === true">
          이미 존재하는 아이디입니다.
        </div> -->
      </div>
      
      <form class="justify-content-center mt-1" @submit.prevent="signup">
        
        <input class="form-control mr-sm-2" style="width: 100%; height: 45px; padding: 10px;" placeholder="아이디를 입력해주세요" type="text" id="username" v-model="credentials.username">
        <input class="form-control mr-sm-2" style="width: 100%; height: 45px; padding: 10px;" placeholder="비밀번호를 입력해주세요" type="password" id="password" v-model="credentials.password">
        <input class="form-control mr-sm-2" style="width: 100%; height: 45px; padding: 10px;" placeholder="비밀번호를 한 번 더 입력해주세요" type="password" id="passwordConfirm" v-model="credentials.passwordConfirm" @keypress.enter="signup">
        <button @click="signup" type="button" class="btn btn-danger mt-3" style="width: 100%;">회원가입</button>
      
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
  name: 'Signup',
  data: function () {
    return {
      imgarray: [backgroundUrl1, backgroundUrl2, backgroundUrl3, backgroundUrl4, backgroundUrl5, backgroundUrl6, backgroundUrl7, backgroundUrl8, backgroundUrl9, backgroundUrl10],
      credentials: {
        username: '',
        password: '',
        passwrodConfirm: '',
      },
      error: false,
    }
  },
  computed: {
    backgroundUrl: function () {
      const randomNum = _.sampleSize(_.range(0, 10), 1)
      return this.imgarray[randomNum]
    }
  },
  methods: {
    signup: function () {
      axios.post('http://3.21.166.3/accounts/signup/', this.credentials,)
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          const errorMessage = err.message
          if (errorMessage[errorMessage.length-3, errorMessage.length-1] === '6') {
            this.newAlert("비밀번호가 틀립니다!")
          }
          else {
            this.newAlert("이미 존재하는 아이디입니다!")
          }
        })
    },
    newAlert: function (data) {
      this.$fire({
        title: data,
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