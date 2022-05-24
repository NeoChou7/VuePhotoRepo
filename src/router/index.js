import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import navContainer from '@/components/NavigationContainer'
import libraryView from '@/components/containervue/library/libraryView'
import videoView from '@/components/containervue/video/videoView'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/Library',
    name: 'libraryView',
    component: libraryView
  },
  {
    path: '/Video',
    name: 'videoView',
    component: videoView
  },
  {
    path: '/Album',
    name: 'albuemView',
    component: libraryView
  },
  {
    path: '*',
    redirect: '/Library'
  }
  ]

})
