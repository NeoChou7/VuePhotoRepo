import stateType from '../Types'
import DateFormat from '@/utility/DateFormat'
import fetchWS from '../fetchWS'
export default{
  state: {
    images: [],
    fullScreenImgIndex: 0
  },
  getters: {
    imgDateInfo (state) {
      if (!state.images.length) return ''
      let name = state.images[state.fullScreenImgIndex].name
      return DateFormat.convertYYYYMMDDHHMMtoDate(name)
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
    deleteSelectedImg (state) {
      state.images = state.images.filter(item => !item.isSelected)
    },
    updateImages (state, payload) {
      let limitFilename = state.images[state.images.length - 1].name
      // payload errorFiles , successResults
      payload.successResults.forEach((element) => {
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
    }
  },
  actions: {
    getImages (context, fromName) {
      fetchWS.wsGetImages(fromName).then((jsonData) => {
        context.commit('addImages', jsonData)
      })
    },
    clickedImg (context, index) {
      context.state.images[index].isSelected = !context.state.images[index].isSelected
    },
    uploadImages (context, imgs) {
      fetchWS.wsFileUpload(imgs).then(data => {
        // 通知 Library 新增了哪些圖片檔
        // this.$refs.container.updateData(data)
        context.commit('updateImages', data)
      }).catch((err) => console.log('err', err))
    },
    openImgFullScreen (context, index) {
      context.commit('changeStateType', stateType.ImgFullScreen)
      context.commit('changeFullScreenImgIndex', index)
    },
    closeImgFullScreen (context) {
      context.commit('changeStateType', stateType.ImgBrowser)
    }
  }
}
