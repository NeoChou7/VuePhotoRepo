<script>
// import fetchWS from '@/fetchWS.js'
export default {
  name: 'navController',
  data () {
    return {
      // isSelectedMode: false,
      // selectedType: 'Library',
      // totalCounts: 0,
      // selectedCounts: 0,
      // isPopup: false,
      scrollLocation: 0
    }
  },
  methods: {
    // selectBtnToggle () {
    //   this.isSelectedMode = !this.isSelectedMode
    // },
    // clickType (type) {
    //   this.selectedType = type
    // },
    // setTotalCount (count) {
    //   this.totalCounts = count
    // },
    // setSelectedCount (count) {
    //   this.selectedCounts = count
    // },
    clickedOption (option) {
      switch (option) {
        case 999:// 取消
          this.$store.dispatch('cancleDelete')
          break
        case 0:// 確定
          // this.$emit('deleteAct')
          // this.$refs.container.deleteAction()
          this.$store.dispatch('deleteAction')
          break
        default:
          this.$store.dispatch('cancleDelete')
          break
      }
    }
    // uploadData (data) {
    //   switch (this.selectedType) {
    //     case 'Library':
    //       this.uploadPhotos(data)
    //       break
    //   }
    // },
    // uploadPhotos (arys) {
    //   fetchWS.wsFileUpload(arys).then(data => {
    //     // 通知 Library 新增了哪些圖片檔
    //     this.$refs.container.updateData(data)
    //   })
    // }

  }

}
</script>
