<template>
  <div>
    <div
      v-for="(videos, index) in getVideos"
      :class="'minDiv'"
      :key="videos.name"
      @click="onImgClick(index)"
    >
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
export default {
  name: 'videoView',
  computed: {
    getVideos () {
      return this.$store.state.videos
    }
  },
  created () {
    this.$store.dispatch('changeNavigationItem', stateType.ImgBrowser)
    if (!this.$store.state.videos.length) {
      this.$store.dispatch('getVideos', '')
    }
  },
  mounted () {

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
</style>
