<template>
<div></div>
</template>
<script>
import stateType from '@/Types'
export default {
  name: 'albumView',
  created () {
    this.$store.dispatch('changeNavigationItem', stateType.AlbumBrowser)
    // if (!this.$store.state.videostore.videos.length) {
    //   this.$store.dispatch('getVideos', '')
    // }
  }
}
</script>
