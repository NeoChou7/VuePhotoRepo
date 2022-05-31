<template>
  <div>
    <div
      v-for="(videos, index) in getVideos"
      :class="['minDiv', { 'full-screen': isFullScreen(index) }]"
      :key="videos.name"
      @click="onVideoClick(index)"
    >
      <video
        preload="metadata"
        :class="'minVideo'"
        playsinline
        @loadedmetadata="setVideoMetaData(index)"
        @timeupdate="updateTime(index)"
      >
        <source :src="getVideoFullPath(videos.name)" type="video/mp4" />
        <!-- <source src="myVideo.webm" type="video/webm"> -->
      </video>
      <!-- fullscreen -->
      <div v-show="isFullScreen(index)" class='header'>
        <span>{{videoDateInfo(index)}}</span>
        <button class='closeIcon' @click.stop="closeFullVideo">X</button>
      </div>
      <div v-show="isFullScreen(index)" class='footer'></div>
      <div v-show="!isFullScreen(index)" class="time-left">{{ videoRestOfTime(index) }}</div>
      <!-- bottom -->
      <button v-show="!isFullScreen(index)" :class="'fullscreen-button'" @click.stop="fullVideo(index)">
        <svg height="100%" version="1.1" viewBox="9 9 18 18" width="100%">
          <path d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"></path>
          <path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"></path>
          <path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"></path>
          <path d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"></path>
        </svg>
      </button>
      <!-- selectedImg -->
      <div
        v-show="videos.isSelected"
        :class="['minVideo', 'deleteClick']"
        :name="videos.name"
      >
        <div class="tickImg"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {stateType} from '@/Types'
import { mapGetters } from 'vuex'
export default {
  name: 'videoView',
  data () {
    return {
      playElement: null
    }
  },
  computed: {
    getVideos () {
      return this.$store.state.videostore.videos
    },
    ...mapGetters(['videoRestOfTime', 'videoDateInfo', 'isFullScreen'])
  },
  created () {
    this.$store.dispatch('changeNavigationItem', stateType.VideoBrowser)
    if (!this.$store.state.videostore.videos.length) {
      this.$store.dispatch('getVideos', '')
    }
  },
  watch: {
    // '$store.state.videostore.videoNode': {
    //   handler (newVal, oldVal) {
    //     console.log(newVal.node.currentSrc + ' ' + newVal.isPlay)
    //     console.log(oldVal.node.currentSrc + ' ' + oldVal.isPlay)
    //     // if (oldVal) {
    //     //   oldVal.pause()
    //     // }
    //     // newVal.play()
    //   },
    //   deep: true
    // }
    // '$store.state.videostore.videoNode.isPlay': {
    //   handler (newVal, oldVal) {
    //     console.log(newVal)
    //     console.log(oldVal)
    //   },
    //   deep: true
    // }

    // videoNode (newVal, oldVal) { // plan1.0
    //   console.log(oldVal.node)
    //   console.log(newVal.node)
    //   console.log(newVal === oldVal)
    //   if (oldVal.node) {
    //     oldVal.node.pause()
    //   }
    //   // if (newVal !== oldVal) {
    //   //   newVal.play()
    //   // }
    //   newVal.node[newVal.isPlay ? 'play' : 'pause']()
    //   // newVal[newVal.paused ? 'play' : 'pause']()
    // }
  },
  methods: {
    getVideoFullPath: function (name) {
      return this.$serverHostPath + '/video/' + name
    },
    onVideoClick (index) {
      switch (this.$store.state.stateType) {
        case stateType.VideoBrowser:
        case stateType.VideoFullScreen:
          this.togglePlay()
          break
        case stateType.VideoSelected:
          this.$store.dispatch('selectedVideo', index)
          break
      }
    },
    togglePlay () {
      let element = event.target
      // this.$store.dispatch('clickedVideo', element)
      if (this.playElement && element !== this.playElement) {
        this.playElement.pause()
      }
      element[element.paused ? 'play' : 'pause']()
      this.playElement = element
    },
    setVideoMetaData (index) {
      this.$store.dispatch('setVideoMetaData', {
        index: index,
        duration: event.target.duration
      })
    },
    updateTime (index) {
      this.$store.dispatch('setVideoCurrentTime', {
        index: index,
        currentTime: event.target.currentTime
      })
    },
    fullVideo (index) {
      switch (this.$store.state.stateType) {
        case stateType.VideoBrowser:
          this.$store.dispatch('setVideoFullScreen', index)
          break
        case stateType.VideoSelected:
          this.$store.dispatch('selectedVideo', index)
          break
        default:
          break
      }
    },
    closeFullVideo () {
      this.$store.dispatch('closeVideoFullScreen')
    }
  }
}
</script>
<style scoped>
.minDiv {
  position: relative;
  width: calc(100% / 3 - 0.2em);
  height: calc(100vw / 3 - 0.2em);
  display: inline-block;
  margin: 0 0.1em;
}
.minDiv.full-screen {
  position: absolute;
  top: 0px;
  left: 0px;
  width: calc(100vw);
  height: 100%;
  z-index: 5;
  background-color: black;
}
.minVideo {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.time-left {
  position: absolute;
  bottom: 0px;
  left: 0px;
  pointer-events: none;
}
.deleteClick {
  backdrop-filter: brightness(50%);
}
.deleteClick .tickImg {
  position: absolute;
  width: 15%;
  height: 15%;
  bottom: 5px;
  right: 5px;
  background-image: url("~@/assets/tickImg.png");
  background-size: contain;
}

.fullscreen-button {
  position: absolute;
  padding: 0px;
  border: 0px;
  width: 15%;
  height: 15%;
  bottom: 5px;
  right: 5px;
}
video~.header{
  position: absolute;
  height:3rem;
  width:100%;
  background-color: white;
  z-index: 5;
}
video~.footer{
height:3rem;
width:100%;
background-color: white;
z-index: 5;
position: absolute;
}
.header .closeIcon {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
