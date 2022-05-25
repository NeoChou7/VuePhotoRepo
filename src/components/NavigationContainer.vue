<script>
import navHeader from './navigationHeader/NavigationHeader.vue'
import navBar from './navigationbar/NavigationBar.vue'
import navOperator from './navigationOperrator/NavigationOperator.vue'
import navController from './NavigationController.vue'
import modal from './Modal.vue'
// import { mapGetters } from 'vuex'
export default {
  name: 'navContainer',
  mixins: [navController],
  components: {
    navHeader,
    navBar,
    navOperator,
    modal
  },
  computed: {
    isSelectMode () {
      return this.$store.state.stateType === 1
    },
    isImgDeleteMode () {
      return this.$store.state.stateType === 2
    }
    // ...mapGetters(['isSelectMode'])
  },
  methods: {
    clickedTrash () {
      this.isPopup = true
    },
    scrollEnd () {
      let content = event.target
      this.scrollLocation = content.scrollTop
      if (content.offsetHeight + content.scrollTop >= content.scrollHeight) {
        // this.$refs.container.loadMore()
        this.$store.dispatch('loadMore')
      }
    }
  },
  mounted () {
  }
}
</script>
<template>
  <div>
    <div class="header">
      <navHeader/>
    </div>
    <div class="container" @scroll="scrollEnd">
      <router-view/>
    </div>
    <div class="footer">
      <navBar/>
    </div>
    <div v-show="isSelectMode">
      <navOperator/>
    </div>
    <modal v-show="isImgDeleteMode"  @clickedOption="clickedOption" />
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
