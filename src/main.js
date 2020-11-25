import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSimpleAlert from "vue-simple-alert"

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSimpleAlert)



Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
