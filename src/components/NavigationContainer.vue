<script>
import navHeader from './navigationHeader/NavigationHeader.vue'
import navBar from './navigationbar/NavigationBar.vue'
import navOperator from './navigationOperrator/NavigationOperator.vue'
import navController from './NavigationController.vue'
import modal from './Modal.vue'
export default {
  name: 'navContainer',
  mixins: [navController],
  components: {
    navHeader,
    navBar,
    navOperator,
    modal
  },
  data () {
    return {
      isPopup: false
    }
  },
  methods: {
    clickedTrash () {
      this.isPopup = true
    },
    scrollEnd () {
      let content = event.target
      if (content.offsetHeight + content.scrollTop >= content.scrollHeight) {
        console.log('scrollend')
        this.$refs.container.loadMore()
      }
    }
  }
}
</script>
<template>
  <div>
    <div class="header">
      <navHeader
        @selectBtnClick="selectBtnToggle"
        @selectedFiles="uploadData"
        :total-counts="totalCounts"
        :is-selected-mode="isSelectedMode"
      />
    </div>
    <div class="container" @scroll="scrollEnd">
      <router-view ref="container"
        :is-selected-mode="isSelectedMode"
        @selectedCounts="setSelectedCount"
        @totalCounts="setTotalCount"
      />
    </div>
    <div class="footer">
      <navBar @clickType="clickType" />
    </div>
    <div v-show="isSelectedMode">
      <navOperator
        :container-type="selectedType"
        :operate-counts="selectedCounts"
        @clickedTrash="clickedTrash"
      />
    </div>
    <modal v-show="isPopup"  @clickedOption="clickedOption" />
  </div>
</template>
<style>
.header {
  position: fixed;
  width: 100%;
  top: 0px;
  box-shadow: 0px 5px 40px rgb(0 0 0 / 80%);
  height: 3rem;
  text-align: center;
  line-height: 3rem;
  z-index: 1;
  backdrop-filter: blur(10px);
}
.HeaderRight {
  position: absolute;
  right: 5px;
  height: 100%;
}
.container {
  /* position: absolute; */
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding-top: 3rem;
  padding-bottom: 3rem;
  overflow: auto;
}
.footer {
  position: fixed;
  height: 3rem;
  width: 100%;
  bottom: 0px;
}

</style>
