<template>
  <div>
    <!-- new album -->
    <div v-show="isAlbumCreate" class="full-screen gray-bg">
      <div class="dialogue">
        <div class="content">
          <div class="title">新增相簿</div>
          <input class="input" type="text" placeholder="相簿名稱" ref="input" />
        </div>
        <div class="btn">
          <div class="cancel" @click="closeCreateDialogue">取消</div>
          <div class="submit" @click="addAlbum">儲存</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { stateType } from '@/Types'
import { mapGetters } from 'vuex'
export default {
  name: 'albumView',
  computed: {
    ...mapGetters(['isAlbumCreate'])
  },
  created () {
    this.$store.dispatch('changeNavigationItem', stateType.AlbumBrowser)
    if (!this.$store.state.albumstore.albums.length) {
      this.$store.dispatch('getAlbums')
    }
  },
  methods: {
    closeCreateDialogue () {
      this.$store.dispatch('cancelAddAlbum')
    },
    addAlbum () {
      let albumName = this.$refs.input.value

      if (albumName.length == 0) {
        alert('不得為空')
        return
      }
      this.$store.dispatch('addAlbum', albumName)
    }
  }
}
</script>
<style scoped>
.full-screen {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 5;
}
.gray-bg {
  background-color: rgba(0, 0, 0, 0.25);
}
.dialogue {
  position: relative;
  width: fit-content;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px blue solid;
  background-color: rgb(240, 240, 240);
}
.cancel {
  display: inline-block;
  width: calc(100% / 2 - 20px);
}
.submit {
  display: inline-block;
  width: calc(100% / 2);
}
</style>
