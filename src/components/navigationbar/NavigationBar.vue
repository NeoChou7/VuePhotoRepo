<script>
import {stateType} from '@/Types'
export default {
  name: 'navBar',
  data () {
    return {
      tabName: [
        { name: '圖庫', iconClass: 'fa-solid fa-images', to: '/Library', stateType: stateType.ImgBrowser },
        { name: '影片', iconClass: 'fa-solid fa-film', to: '/Video', stateType: stateType.VideoBrowser },
        { name: '相簿', iconClass: 'fa-solid fa-book', to: '/Album', stateType: stateType.AlbumBrowser }
      ]
    }
  },
  computed: {
    width () {
      return 'width:calc(100%/' + this.tabName.length + ');'
    }
  },
  methods: {
    changeStateType (type) {
      this.$store.dispatch('changeNavigationItem', type)
    }
  },
  mounted: function () {
    this.$el.querySelector('.nav-item').classList.add('active')
  }
}
</script>
<template>
  <div>
    <div class="nav">
      <router-link
        v-for="tab in tabName"
        :class="'nav-item'"
        :style="width"
        :to="tab.to"
        @click.native="changeStateType(tab.stateType)"
        :key="tab.name"
      >
        <i :class="tab.iconClass"></i>
        <span>{{ tab.name }}</span>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.nav {
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  width: 100%;
  height: 3rem;
  margin: auto;
  background-color: #fff;
  /* padding: 25px 20px; */
  /* border-bottom-left-radius: 30px; */
  /* border-bottom-right-radius: 30px; */
  box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.8);
}
.nav a {
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  justify-content: center;
}
</style>
