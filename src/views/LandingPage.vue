<template>
  <div id="carousel" class="carousel slide carousel-fade" data-ride="carousel" >
    
    <div id="mention" class="w3-display-container w3-animate-opacity">
      <a href="/home">
        <div class="w3-display-middle d-flex flex-column align-items-center" style="width: 400px;">
          <!-- <template v-if="isLogin">
            <h1 @click="newAlert" class="w3-jumbo w3-animate-top"><router-link :to="{ name: 'Home' }">MoVue</router-link></h1>
          </template> -->
          <template>
            <h1 @click.prevent="newAlert" class="w3-jumbo w3-animate-top">MoVue</h1>
          </template>
          <hr class="w3-border-grey" style="margin:auto;width:40%">
          <p class="w3-large w3-center">Jubin Jang & Chaewon Kang</p>
        </div>
      </a>
    </div>
    
    <div class="carousel-inner" role="listbox">
      <div class="carousel-item active bgimg" data-interval="1500">
        <img width="auto" height="100%" overfit="cover" :src="image" alt="First slide">
      </div>
      <div class="carousel-item bgimg" data-interval="1500">
        <img width="auto" height="100%" overfit="cover" :src="image2" alt="Second slide">
      </div>
      <div class="carousel-item bgimg" data-interval="1500">
        <img width="auto" height="100%" overfit="cover" :src="image3" alt="Third slide">
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'LandingPage',
    props: {
      isLogin: {
        type: Boolean
      },
    },
    data: function () {
      return {
        image: require('@/assets/LandingPage/background.jpg'),
        image2: require('@/assets/LandingPage/background2.jpg'),
        image3: require('@/assets/LandingPage/background3.jpg')
      }
    },
    methods: {
      newAlert: function () {
        if (this.isLogin === false) {
          this.$fire({
            title: "로그인을 해주세요!",
            text: "",
            type: "error",
            // timer: 3000
          }).then(r => {
            console.log(r);
          });
        }
      },
    },
}
</script>

<style scoped>

  #carousel {
    width: 100%;
    height: 100%;
  }

  .carousel-inner {
    width: 100%;
    height: 100%;
  }

  .carousel-item {
    text-align: center;
  }

  #mention {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white !important;
    font-family: "Raleway",sans-serif;
    z-index: 2;
  }

  .bgimg {
    height: 100%;
  }

  .bgimg::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 120px 100px 250px #000000, inset -120px -100px 250px #000000;
  }

  a {
    text-decoration: none !important;
    color: white !important;
  }

  a:hover {
    text-decoration: none !important;
    color: white;
    cursor: pointer;
  }

</style>