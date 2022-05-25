import Vue from 'vue'
import Vuex from 'vuex'
import fetchWS from '../fetchWS'
import stateType from '../Types'
Vue.use(Vuex)
// stateType
// 0:Imag browser
// 1: img selected
// 2: img delete
// 3: img fullScreen

function convertYYYYMMDDHHMMtoDate (strDate) {
  let year = strDate.slice(0, 4)
  let month = strDate.slice(4, 6)
  let day = strDate.slice(6, 8)
  let hour = strDate.slice(8, 10)
  let min = strDate.slice(10, 12)
  return year + '/' + month + '/' + day + ' ' + hour + ':' + min
}
export default new Vuex.Store({
  state: {
    stateType: stateType.ImgBrowser,
    images: [],
    videos: [],
    fullScreenImgIndex: 0

  },
  getters: {
    // getImages: (state) => { return state.images }
    totalCounts (state) {
      switch (state.stateType) {
        case stateType.ImgBrowser:
          return state.images.length + '張照片'
        case stateType.VideoBrowser:
          return state.videos.length + '支影片'
        default:
          return 0
      }
    },
    selectBtnTitle (state) {
      switch (state.stateType) {
        case 0:
          return '選取'
        case 1:
          return '取消'
        default:
          return '選取'
      }
    },
    // isSelectMode (state) {
    //   return state.stateType === 1
    // },
    // isImgDeleteMode (state) {
    //   return state.stateType === 2
    // },
    imgSelectedCount (state) {
      return state.images.filter(item => item.isSelected).length
    },
    imgSelectedCountUnit (state) {
      return state.stateType === stateType.ImgSelected ? '張照片' : ''
    },
    imgDateInfo (state) {
      if (!state.images.length) return ''
      let name = state.images[state.fullScreenImgIndex].name
      return convertYYYYMMDDHHMMtoDate(name)
    },
    imgCurrentPage (state) {
      return state.fullScreenImgIndex + 1
    },
    currentFullImgSrc (state) {
      if (!state.images.length) return ''
      let name = state.images[state.fullScreenImgIndex].name
      return 'http://localhost:8080' + '/image/' + name
    },
    preFullImgSrc (state) {
      if (state.fullScreenImgIndex - 1 < 0) return ''
      let name = state.images[state.fullScreenImgIndex - 1].name
      return 'http://localhost:8080' + '/image/' + name
    },
    nextFullImgSrc (state) {
      if (state.fullScreenImgIndex + 1 >= state.images.length) return ''
      let name = state.images[state.fullScreenImgIndex + 1].name
      return 'http://localhost:8080' + '/image/' + name
    }

  },
  mutations: {
    addImages (state, jsonData) {
      for (var i in jsonData) {
        if (!jsonData.hasOwnProperty(i)) continue
        state.images.push({name: jsonData[i], isSelected: false})
      }
    },
    changeStateType (state, type) {
      state.stateType = type
    },
    clearSelected (state) {
      state.images.forEach(img => { img.isSelected = false })
    },
    deleteSelectedImg (state) {
      state.images = state.images.filter(item => !item.isSelected)
    },
    updateImages (state, payload) {
      let limitFilename = state.images[state.images.length - 1].name
      payload.forEach((element) => {
        if (element >= limitFilename) {
          state.images.push({name: element, isSelected: false})
        }
      })

      state.images.sort(function (a, b) {
        if (a.name > b.name) return -1
        if (a.name < b.name) return 1
        return 0
      })
    },
    changeFullScreenImgIndex (state, index) {
      state.fullScreenImgIndex = index
    },
    updateVideos (state, payload) {
      let limitFilename = state.images[state.images.length - 1].name
      payload.forEach((element) => {
        if (element >= limitFilename) {
          state.videos.push({name: element, isSelected: false})
        }
      })

      state.videos.sort(function (a, b) {
        if (a.name > b.name) return -1
        if (a.name < b.name) return 1
        return 0
      })
    },
    addVideos (state, jsonData) {
      for (var i in jsonData) {
        if (!jsonData.hasOwnProperty(i)) continue
        state.videos.push({name: jsonData[i], isSelected: false})
      }
    }
  },
  actions: {
    getImages (context, fromName) {
      fetchWS.wsGetImages(fromName).then((jsonData) => {
        context.commit('addImages', jsonData)
      })
    },
    clickSelectBtn (context) {
      context.commit('changeStateType', context.state.stateType === stateType.ImgBrowser ? stateType.ImgSelected : stateType.ImgBrowser)
      if (context.state.stateType === stateType.ImgBrowser) {
        // 取消選取
        context.commit('clearSelected')
      }
    },
    clickedImg (context, index) {
      context.state.images[index].isSelected = !context.state.images[index].isSelected
    },
    clickedDeleteImgBtn (context) {
      context.commit('changeStateType', stateType.ImgDelete)
    },
    cancleDelete (context) {
      context.commit('changeStateType', stateType.ImgSelected)
    },
    deleteImgAction (context) {
      // ws刪除
      let deleteImgs = context.state.images.filter(ele => ele.isSelected).map(ele => ele.name)
      fetchWS.wsDeleteImages(deleteImgs).then((data) => {
        context.commit('deleteSelectedImg')
      }).catch((err) => console.log('err', err))
    },
    upload (context, payload) {
      switch (context.state.stateType) {
        case stateType.ImgBrowser:
          context.dispatch('uploadImages', payload)
          break
        case stateType.VideoBrowser:
          context.dispatch('uploadVideos', payload)
          break
        default:
          break
      }
    },
    uploadImages (context, imgs) {
      fetchWS.wsFileUpload(imgs).then(data => {
        // 通知 Library 新增了哪些圖片檔
        // this.$refs.container.updateData(data)
        context.commit('updateImages', data)
      }).catch((err) => console.log('err', err))
    },
    uploadVideos (context, videos) {
      fetchWS.wsFileUpload(videos).then(data => {
        // 通知 Library 新增了哪些圖片檔
        // this.$refs.container.updateData(data)
        context.commit('updateVideos', data)
      }).catch((err) => console.log('err', err))
    },
    openImgFullScreen (context, index) {
      context.commit('changeStateType', stateType.ImgFullScreen)
      context.commit('changeFullScreenImgIndex', index)
    },
    closeImgFullScreen (context) {
      context.commit('changeStateType', stateType.ImgBrowser)
    },
    loadMore (context) {
      switch (context.state.stateType) {
        case 0 :
        case 1:
          let lastFileName = context.state.images[context.state.images.length - 1].name
          context.dispatch('getImages', lastFileName)
          break
        default:
          break
      }
    },
    changeNavigationItem (context, type) {
      context.commit('changeStateType', type)
    },
    getVideos (context, fromName) {
      fetchWS.wsGetVideos(fromName).then((jsonData) => {
        context.commit('addVideos', jsonData)
      })
    }
  }
})
