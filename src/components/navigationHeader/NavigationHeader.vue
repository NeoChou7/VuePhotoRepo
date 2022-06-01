<script>
import { mapGetters } from 'vuex'
export default {
  name: 'navHeader',
  computed: {
    selectBtnTitle () {
      return this.$store.getters.selectBtnTitle
    },
    ...mapGetters(['totalCountsAndUnit', 'isAlbumView'])
  },
  mounted: function () {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute(
      'src',
      'https://kit.fontawesome.com/5806ab4e4f.js'
    )
    document.head.appendChild(recaptchaScript)
  },
  methods: {
    selectBtnClick () {
      // this.$emit('selectBtnClick')
      // 替換狀態
      this.$store.dispatch('clickSelectBtn')
    },
    insertData () {
      let arys = event.target.files
      // 把檔案傳到外層處理
      this.$store.dispatch('upload', arys)
    },
    openCreateAlbum () {
      this.$store.dispatch('openCreateAlbum')
    }
  }
}
</script>
<template>
  <div>
    <div v-if="isAlbumView">
      <button class="header-left">刪除</button>
      <span class="total-num">xx相簿</span>
      <button class="HeaderRight" @click="openCreateAlbum">新增</button>
    </div>
    <div v-else>
      <div>
        <span class="total-num">{{ totalCountsAndUnit }}</span>
      </div>
      <div class="header-right">
        <button id="selectBtn" @click="selectBtnClick">
          {{ selectBtnTitle }}
        </button>
        <input
          id="file"
          type="file"
          style="display: none"
          data-target="file-uploader"
          multiple
          @change="insertData"
        />
        <i
          class="fa-solid fa-align-center fa-folder-plus fa-2x add"
          onclick="file.click()"
        ></i>
      </div>
    </div>
  </div>
</template>
<style scoped>
.header-left {
  position: absolute;
  left: 5px;
  height: 100%;
}
.header-right {
  position: absolute;
  right: 5px;
  height: 100%;
}
.total-num {
  position: absolute;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}
.add {
  vertical-align: middle;
}
</style>
