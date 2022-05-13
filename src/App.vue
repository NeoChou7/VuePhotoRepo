<template>
  <div id="app">
    <navContainer />
  </div>
</template>

<script>
import navContainer from './components/NavigationContainer'
export default {
  name: 'App',
  components: { navContainer }
}
</script>

<style>
html,
body {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
