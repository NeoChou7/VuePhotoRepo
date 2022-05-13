import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import navContainer from '@/components/NavigationContainer'
import libraryView from '@/components/containervue/library/libraryView'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/Librar',
    name: 'libraryView',
    component: libraryView
  },
  {
    path: '*',
    redirect: '/Librar'
  }
  ]

})
