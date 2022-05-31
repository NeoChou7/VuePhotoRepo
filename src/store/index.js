import Vue from 'vue'
import Vuex from 'vuex'
import fetchWS from '../fetchWS'
import {stateType} from '@/Types'
import librarystore from './LibraryStore'
import videostore from './VideoStore'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    librarystore, videostore
  },
  state: {
    stateType: stateType.ImgBrowser
  },
  getters: {
    // getImages: (state) => { return state.images }
    totalCountsAndUnit (state, getters) {
      return getters.totalCounts + getters.countUnit
    },
    totalCounts (state) {
      switch (state.stateType) {
        case stateType.ImgBrowser:
        case stateType.ImgSelected:
        case stateType.ImgFullScreen:
          return state.librarystore.images.length
        case stateType.VideoBrowser:
        case stateType.VideoSelected:
          return state.videostore.videos.length
        default:
          return 0
      }
    },
    countUnit (state) {
      switch (state.stateType) {
        case stateType.ImgBrowser:
        case stateType.ImgSelected:
        case stateType.ImgFullScreen:
          return '張照片'
        case stateType.VideoSelected:
        case stateType.VideoBrowser:
          return '支影片'
        default:
          return ''
      }
    },
    selectBtnTitle (state) {
      switch (state.stateType) {
        case stateType.ImgBrowser:
        case stateType.VideoBrowser:
          return '選取'
        case stateType.ImgSelected:
        case stateType.VideoSelected:
          return '取消'
        default:
          return '選取'
      }
    },
    isSelectMode (state) {
      switch (state.stateType) {
        case stateType.ImgSelected:
        case stateType.VideoSelected:
          return true
        default:
          return false
      }
    },
    isDeleteMode (state) {
      switch (state.stateType) {
        case stateType.ImgDelete:
        case stateType.VideoDelete:
          return true
        default:
          return false
      }
    },
    selectedCount (state) {
      switch (state.stateType) {
        case stateType.ImgSelected:
          return state.librarystore.images.filter(item => item.isSelected).length
        case stateType.VideoSelected:
          return state.videostore.videos.filter(item => item.isSelected).length
        default:
          return 0
      }
    }
  },
  mutations: {
    changeStateType (state, type) {
      state.stateType = type
    },
    clearSelected (state) {
      state.librarystore.images.forEach(img => { img.isSelected = false })
      state.videostore.videos.forEach(video => { video.isSelected = false })
    }
  },
  actions: {
    clickSelectBtn (context) {
      switch (context.state.stateType) {
        case stateType.ImgBrowser:
        case stateType.ImgSelected:
          context.commit('changeStateType', context.state.stateType === stateType.ImgBrowser ? stateType.ImgSelected : stateType.ImgBrowser)
          break
        case stateType.VideoBrowser:
        case stateType.VideoSelected:
          context.commit('changeStateType', context.state.stateType === stateType.VideoBrowser ? stateType.VideoSelected : stateType.VideoBrowser)
          break
      }
      // if (context.state.stateType === stateType.ImgBrowser || context.state.stateType === stateType.VideoBrowser) {
      //   // 取消選取
      //   context.commit('clearSelected')
      // }
    },
    clickedDeleteBtn (context) {
      switch (context.state.stateType) {
        case stateType.ImgSelected:
          context.commit('changeStateType', stateType.ImgDelete)
          break
        case stateType.VideoSelected:
          context.commit('changeStateType', stateType.VideoDelete)
          break
        default:
          break
      }
    },
    cancleDelete (context) {
      switch (context.state.stateType) {
        case stateType.ImgDelete:
          context.commit('changeStateType', stateType.ImgSelected)
          break
        case stateType.VideoDelete:
          context.commit('changeStateType', stateType.VideoSelected)
          break
        default:
          break
      }
    },
    deleteAction (context) {
      // ws刪除
      let deleteItems = []
      switch (context.state.stateType) {
        case stateType.ImgDelete:
          deleteItems = context.state.librarystore.images.filter(ele => ele.isSelected).map(ele => ele.name)
          break
        case stateType.VideoDelete:
          deleteItems = context.state.videostore.videos.filter(ele => ele.isSelected).map(ele => ele.name)
          break
        default:
          break
      }
      fetchWS.wsDeleteImages(deleteItems).then((data) => {
        switch (context.state.stateType) {
          case stateType.ImgDelete:
            context.commit('deleteSelectedImg')
            context.commit('changeStateType', stateType.ImgSelected)
            break
          case stateType.VideoDelete:
            context.commit('deleteSelectedVideo')
            context.commit('changeStateType', stateType.VideoSelected)
            break
          default:
            break
        }
      }).catch((err) => console.log('err', err))
    },
    upload (context, payload) {
      switch (context.state.stateType) {
        case stateType.ImgBrowser:
        case stateType.ImgSelected:
          context.dispatch('uploadImages', payload)
          break
        case stateType.VideoBrowser:
        case stateType.VideoSelected:
          context.dispatch('uploadVideos', payload)
          break
        default:
          break
      }
    },
    loadMore (context) {
      switch (context.state.stateType) {
        case 0 :
        case 1:
          let lastFileName = context.state.librarystore.images[context.state.librarystore.images.length - 1].name
          context.dispatch('getImages', lastFileName)
          break
        default:
          break
      }
    },
    changeNavigationItem (context, type) {
      context.commit('changeStateType', type)
    }
  }
})
