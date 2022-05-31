<script>
// import fetchWS from '@/fetchWS.js'
import modal from '../../Modal.vue'
import { mapGetters } from 'vuex'
import stateType from '@/Types'

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
    closeFullImg () {
      this.$store.dispatch('closeImgFullScreen')
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
    },
    isShowFullImg () {
      return this.$store.state.stateType === stateType.ImgFullScreen
    },
    ...mapGetters([
      'imgDateInfo',
      'imgCurrentPage',
      'totalCounts',
      'currentFullImgSrc',
      'preFullImgSrc',
      'nextFullImgSrc'
    ])
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
    <div v-show="isShowFullImg" :class="['fullscreen', 'fullImg']">
      <div class="fullImgHeader">
        <span id="fullImgTitle">{{ imgCurrentPage }}/{{ totalCounts }}</span
        ><button
          class="closeIcon"
          @click.prevent="closeFullImg"
          @touched.prevent="closeFullImg"
        >
          X
        </button>
      </div>
      <div class="fullImgContent" ><!--@touchend.prevent="detectTouchEnd()"-->
        <!-- <div id="imgContainer" ref="imgContainer"></div> -->
        <div>
          <div>
            <img :src="preFullImgSrc" />
          </div>
          <div>
            <img :src="currentFullImgSrc" />
          </div>
          <div>
            <img :src="nextFullImgSrc" />
          </div>
        </div>
      </div>
      <div class="fullImgFooter">{{ imgDateInfo }}</div>
    </div>
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
.fullscreen {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
}
.fullImg {
  z-index: 3;
  background-color: black;
}
.fullImgHeader {
  position: absolute;
  top:0px;
  width:100vw;
  height: 3rem;
  color: white;
  text-align: center;
  line-height: 3rem;
}
.fullImgHeader .closeIcon {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
}
.fullImgContent {
  position: absolute;
  top: 0px;
  left: 0px;
  height: calc(100%);
  width: calc(100%);

  overflow: scroll;
  overflow-y: hidden;
}
.fullImgContent::-webkit-scrollbar {
  width: 0;
  background-color: transparent;
}
.fullImgContent > div {
  height: calc(100%);

  display: flex;
  width: calc(3 * 100%);
  border: 5px blue solid;
}
.fullImgContent > div > div {
  /* height: calc(100% - 6rem); */

  flex: 1;
  width: calc(100vw);
  border: 5px red solid;
}
.fullImgContent img {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.fullImgFooter {
  position: absolute;
  bottom:0px;
  width:100vw;
  height: 3rem;
  color: white;
  text-align: center;
  line-height: 3rem;
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
