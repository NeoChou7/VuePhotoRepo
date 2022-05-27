<template>
  <div>
    <div
      v-for="(videos, index) in getVideos"
      :class="'minDiv'"
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
      <div class="time-left">{{ videoRestOfTime(index) }}</div>
      <div
        v-show="videos.isSelected"
        :class="['minVideo', 'deleteClick']"
        :name="videos.name"
      >
        <div class="tickImg"></div>
      </div>
      <!-- <img
        :src="getxsImgFullPath(imgs.name)"
        :class="'minImg'"
        :name="imgs.name"
      />
      <div
        v-show="imgs.isSelected"
        :class="['minImg', 'deleteClick']"
        mask
        :name="imgs.name"
      >
        <div class="tickImg"></div>
      </div> -->
    </div>
  </div>
</template>
<script>
import stateType from '@/Types'
import { mapGetters } from 'vuex'
export default {
  name: 'videoView',
  computed: {
    getVideos () {
      return this.$store.state.videostore.videos
    },
    ...mapGetters(['videoRestOfTime'])
  },
  created () {
    this.$store.dispatch('changeNavigationItem', stateType.VideoBrowser)
    if (!this.$store.state.videostore.videos.length) {
      console.log('video load')
      this.$store.dispatch('getVideos', '')
    }
  },
  mounted () {},
  methods: {
    getVideoFullPath: function (name) {
      return this.$serverHostPath + '/video/' + name
    },
    onVideoClick (index) {
      // if imgbrowser 放大
      switch (this.$store.state.stateType) {
        case stateType.VideoBrowser:
          this.togglePlay()
          break
        case stateType.VideoSelected:
          this.$store.dispatch('clickedVideo', index)
          break
      }
    },
    togglePlay () {
      let element = event.target
      element[element.paused ? 'play' : 'pause']()
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
.minVideo {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.time-left{
  position: absolute;
  bottom: 0px;
  left: 0px;
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
</style>
