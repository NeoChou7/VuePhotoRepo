
import fetchWS from '../fetchWS'
export default{
  state: {
    videos: []
  },
  getters: {
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
    uploadVideos (context, videos) {
      fetchWS.wsFileUpload(videos).then(data => {
        // 通知 Library 新增了哪些圖片檔
        // this.$refs.container.updateData(data)
        context.commit('updateVideos', data)
      }).catch((err) => console.log('err', err))
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

}
