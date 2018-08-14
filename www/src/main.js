// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import io from 'socket.io-client'
import store from './store'
import VueMaterial from 'vue-material'
import Vddl from 'vddl'

import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial)
Vue.use(Vddl)

new Vue({
  el: '#app',
  store,
  router,
  VueMaterial,
  template: '<App/>',
  components: { App }
})