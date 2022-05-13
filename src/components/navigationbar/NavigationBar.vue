<script>
export default {
  name: 'navBar',
  data () {
    return {
      tabName: ['圖庫', '影片', '相簿']
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
      <div v-for="name in tabName" :class="'nav-item'" :key="name">
        <p>{{name}}</p>
      </div>
    </div>
    <!-- </div>
      <div class="nav-item active">
        <i class="material-icons home-icon"> home </i>
        <span class="nav-text">Home</span>
      </div>
      <div class="nav-item">
        <i class="material-icons favorite-icon"> favorite </i>
        <span class="nav-text">Likes</span>
      </div>
      <div class="nav-item">
        <i class="material-icons search-icon"> search </i>
        <span class="nav-text">Search</span>
      </div>
      <div class="nav-item">
        <i class="material-icons person-icon"> person </i>
        <span class="nav-text">Profile</span>
      </div>
    </div> -->
  </div>
</template>
<style scoped>

.nav {
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  width: 100%;
  margin: auto;
  background-color: #fff;
  /* padding: 25px 20px; */
  /* border-bottom-left-radius: 30px; */
  /* border-bottom-right-radius: 30px; */
  box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.8);
}
</style>
