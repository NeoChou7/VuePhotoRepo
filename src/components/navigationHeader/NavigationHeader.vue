<script>
import { mapGetters } from 'vuex'
import stateType from '@/Types'
export default {
  name: 'navHeader',
  computed: {
    selectBtnTitle () {
      return this.$store.getters.selectBtnTitle
    },
    isAlbumView () {
      return this.$store.state.stateType === stateType.AlbumBrowser
    },
    ...mapGetters(['totalCountsAndUnit'])
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
    }
  }
}
</script>
<template>
  <div>
    <div v-if="isAlbumView">
      <button>刪除</button>
      <span>xx相簿</span>
      <button>新增</button>
    </div>
    <div v-else>
      <div>
        <span id="totalNum">{{ totalCountsAndUnit }}</span>
      </div>
      <div class="HeaderRight">
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
.HeaderRight {
  position: absolute;
  right: 5px;
  height: 100%;
}
#totalNum {
  position: absolute;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}
.add {
  vertical-align: middle;
}
</style>
