<script>

export default {
  name: 'navController',
  data () {
    return {
      isSelectedMode: false,
      selectedType: 'Library',
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
    selectedCount (count) {
      this.selectedCounts = count
    }

  }

}
</script>
