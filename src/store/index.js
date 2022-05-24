import Vue from 'vue'
import Vuex from 'vuex'
import fetchWS from '../fetchWS'
Vue.use(Vuex)
// stateType
// 0:Imag browser
// 1: img selected
// 2: img delete
export default new Vuex.Store({
  state: {
    stateType: 0,
    images: [],
    videos: []
  },
  getters: {
    // getImages: (state) => { return state.images }
    imgTotalCounts (state) {
      return state.images.length
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
      return state.stateType === 1 ? '張照片' : ''
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
    }

  },
  actions: {
    getImages (context, fromName) {
      fetchWS.wsGetImages(fromName).then((jsonData) => {
        context.commit('addImages', jsonData)
      })
    },
    clickSelectBtn (context) {
      context.commit('changeStateType', context.state.stateType === 0 ? 1 : 0)
      if (context.state.stateType === 0) {
        // 取消選取
        context.commit('clearSelected')
      }
    },
    clickedImg (context, index) {
      context.state.images[index].isSelected = !context.state.images[index].isSelected
    },
    clickedDeleteImgBtn (context) {
      context.commit('changeStateType', 2)
    },
    cancleDelete (context) {
      context.commit('changeStateType', 1)
    },
    deleteImgAction (context) {
      // ws刪除
      let deleteImgs = context.state.images.filter(ele => ele.isSelected).map(ele => ele.name)
      fetchWS.wsDeleteImages(deleteImgs).then((data) => {
        context.commit('deleteSelectedImg')
      }).catch((err) => console.log('err', err))
    }
  }
})
