import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import navContainer from '@/components/NavigationContainer'
import libraryView from '@/components/containervue/library/LibraryView'
import videoView from '@/components/containervue/video/VideoView'
import albumView from '@/components/containervue/album/Albumview'
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
    name: 'albumView',
    component: albumView
  },
  {
    path: '*',
    redirect: '/Library'
  }
  ]

})
