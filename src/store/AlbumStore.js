import fetchWS from "../fetchWS";
import { stateType } from "@/Types";
// import DateFormat from '@/utility/DateFormat'
// let defaultVideo = {
//   name: '', isSelected: false, duration: 0, currentTime: 0, isFullScreen: false
// }
export default {
  state: {
    albums: []
  },
  mutations: {
    createAlbuem(state, albumName) {
      let limitFilename = state.videos[state.videos.length - 1].name;
      // payload errorFiles , successResults
      payload.successResults.forEach(element => {
        if (element >= limitFilename) {
          state.videos.push(Object.assign({}, defaultVideo, { name: element }));
        }
      });
    }
  },
  actions: {
    openCreateAlbum(context) {
      context.commit("changeStateType", stateType.AlbumCreate);
    },
    cancelAddAlbum(context) {
      context.commit("changeStateType", stateType.AlbumBrowser);
    },
    addAlbum(context, payload) {
      fetchWS
        .wsAddAlbum(payload)
        .then(data => {
          context.commit("changeStateType", stateType.AlbumBrowser);
        })
        .catch(err => console.log("err", err));
    },
    getAlbums(context) {
      fetchWS
        .wsGetAlbums()
        .then(data => {
          console.log(data);
          // context.commit('changeStateType', stateType.AlbumBrowser)
        })
        .catch(err => console.log("err", err));
    }
  }
};
