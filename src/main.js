// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import env from '../config/env'
import store from './store'
// from config

Vue.config.productionTip = false
Vue.prototype.$serverHostPath = env.serverHostPath
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
