<script>

export default {
  name: 'navController',
  data () {
    return {
      isSelectedMode: false,
      selectedType: 'Library',
      totalCounts: 0,
      selectedCounts: 0
    }
  },
  methods: {
    selectBtnToggle () {
      this.isSelectedMode = !this.isSelectedMode
    },
    clickType (type) {
      this.selectedType = type
    },
    setTotalCount (count) {
      this.totalCounts = count
    },
    setSelectedCount (count) {
      this.selectedCounts = count
    },
    clickedOption (option) {
      switch (option) {
        case 999:// 取消
          this.isPopup = false
          break
        case 0:// 確定
          // this.$emit('deleteAct')
          this.$refs.container.deleteAction()
          break
        default:
          this.isPopup = false
          break
      }
    }

  }

}
</script>
