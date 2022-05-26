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
        case stateType.ImgSelected:
          return state.images.length + '張照片'
        case stateType.VideoBrowser:
        case stateType.VideoSelected:
          return state.videos.length + '支影片'
        default:
          return 0
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
    },
    videoDuration: (state) => index => {
      return state.videos[index].duration
    },
    videoRestOfTime: (state) => index => {
    //   let totalTime = Math.ceil(state.videos[index].duration)
    //   let currentT = Math.ceil(state.videos[index].currentTime)
      //   let restOfTime = Math.round(totalTime - currentT)
      let totalTime = state.videos[index].duration
      let currentT = state.videos[index].currentTime
      let restOfTime = totalTime - currentT
      let time = new Date(restOfTime * 1000).toISOString().substring(11, 19)
      time = time.slice(0, 2) !== '00' ? time : time.substring(3, 8)
      return time
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
      state.videos.forEach(video => { video.isSelected = false })
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
          state.videos.push({name: element, isSelected: false, currentTime: 0, duration: 0})
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
        state.videos.push({name: jsonData[i], isSelected: false, currentTime: 0, duration: 0})
      }
    },
    setDuration (state, {index, duration}) {
      state.videos[index].duration = duration
    },
    setCurrentTime (state, {index, currentTime}) {
      state.videos[index].currentTime = currentTime
    },
    deleteSelectedVideo (state) {
      state.videos = state.videos.filter(item => !item.isSelected)
    }
  },
  actions: {
    getImages (context, fromName) {
      fetchWS.wsGetImages(fromName).then((jsonData) => {
        context.commit('addImages', jsonData)
      })
    },
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
      if (context.state.stateType === stateType.ImgBrowser || context.state.stateType === stateType.VideoBrowser) {
        // 取消選取
        context.commit('clearSelected')
      }
    },
    clickedImg (context, index) {
      context.state.images[index].isSelected = !context.state.images[index].isSelected
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
          deleteItems = context.state.images.filter(ele => ele.isSelected).map(ele => ele.name)
          break
        case stateType.VideoDelete:
          deleteItems = context.state.videos.filter(ele => ele.isSelected).map(ele => ele.name)
          break
        default:
          break
      }
      console.log(deleteItems)
      fetchWS.wsDeleteImages(deleteItems).then((data) => {
        console.log(context.state.stateType)
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
    },
    setVideoMetaData (context, payload) {
      context.commit('setDuration', payload)
    },
    setVideoCurrentTime (context, payload) {
      context.commit('setCurrentTime', payload)
    },
    clickedVideo (context, index) {
      context.state.videos[index].isSelected = !context.state.videos[index].isSelected
    }
  }
})
