<script>
export default {
  name: 'navHeader',
  // data () {
  //   return {
  //     selectBtnTitle: '選取'

  //   }
  // },
  props: {
    isSelectedMode: {
      type: Boolean
    }
    // totalCounts: {
    //   type: Number,
    //   default: 0
    // }
  },
  computed: {
    totalCounts () {
      return this.$store.getters.imgTotalCounts
    },
    selectBtnTitle () {
      return this.$store.getters.selectBtnTitle
    }
  },
  mounted: function () {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://kit.fontawesome.com/5806ab4e4f.js')
    document.head.appendChild(recaptchaScript)
  },
  watch: {
    // isSelectedMode () {
    //   //  修改
    //   this.selectBtnTitle = this.isSelectedMode ? '取消' : '選取'
    // }
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
      this.$emit('selectedFiles', arys)
    }
  }

}
</script>
<template>
<div>
    <div>
      <span id="totalNum">總共{{totalCounts}}張</span>
    </div>
    <div class="HeaderRight">
      <button id="selectBtn" @click="selectBtnClick">{{selectBtnTitle}}</button>
      <input id="file" type="file" style="display: none" data-target="file-uploader" multiple  @change="insertData"/>
      <i class="fa-solid fa-align-center fa-folder-plus fa-2x add" onclick="file.click()"></i>
    </div>
</div>
</template>
<style scoped>
.HeaderRight{
  position: absolute;
  right: 5px;
  height: 100%;
}
#totalNum{
  position: absolute;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}
.add{
  vertical-align: middle;
}
</style>
