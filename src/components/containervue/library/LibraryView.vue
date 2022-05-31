<script>
// import fetchWS from '@/fetchWS.js'
import modal from '../../Modal.vue'
import {stateType} from '@/Types'
export default {
  name: 'libraryView',
  sentinelDate: '',
  components: {
    modal
  },
  methods: {
    getxsImgFullPath: function (name) {
      return this.$serverHostPath + '/image-xs/' + name
    },
    onImgClick (index) {
      // if imgbrowser 放大
      switch (this.$store.state.stateType) {
        case stateType.ImgBrowser:
          this.$store.dispatch('openImgFullScreen', index)
          break
        case stateType.ImgSelected:
          this.$store.dispatch('clickedImg', index)
          break
      }
    },
    didShowBrowserDateInfo (imgName, index) {
      if (index % 3 === 0 && this.sentinelDate !== imgName.substring(0, 8)) {
        this.sentinelDate = imgName.substring(0, 8)
        return true
      }
      return false
    }
  },
  computed: {
    getImages () {
      return this.$store.state.librarystore.images
      // return this.$store.getters.getImages
    }
  },
  created () {
    this.$store.dispatch('changeNavigationItem', stateType.ImgBrowser)
    if (!this.$store.state.librarystore.images.length) {
      this.$store.dispatch('getImages', '')
    }
  }
}
</script>

<template>
  <div>
    <div
      v-for="(imgs, index) in getImages"
      :class="'minDiv'"
      :key="imgs.name"
      @click="onImgClick(index)"
    >
    <div v-if="didShowBrowserDateInfo(imgs.name,index)" class="browser-date-info">
      <span>{{sentinelDate}}</span>
    </div>
      <img
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
      </div>
    </div>
    <div class="scrollDate">
    </div>
    <div class="intervalBar">
      <span>年</span>
      <span>月</span>
      <span>日</span>
      <span>所有照片</span>
    </div>
    <!-- fullscreen -->

  </div>
</template>
<style scoped>
.minDiv {
  position: relative;
  width: calc(100% / 3 - 0.2em);
  height: calc(100vw / 3 - 0.2em);
  display: inline-block;
  margin: 0 0.1em;
}
.minImg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
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

.scrollDate {
  position: absolute;
  top: calc(3rem + 10px);
  left: 10px;
}
.scrollDate > div {
  backdrop-filter: blur(5px);
  border-radius: 25%;
}
.scrollDate span {
  font-weight: bold;
  color: white;
}
.intervalBar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(3rem + 20px);
  backdrop-filter: blur(5px);
  border-radius: 5%;
  color: white;
}
.browser-date-info{
  position: absolute;
  color: white;
  top:-5px;
  z-index: 3;
}
</style>
