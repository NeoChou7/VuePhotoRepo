<script>

export default {
  name: 'modal',
  methods: {
    clickedOption (option) {
      this.$emit('clickedOption', option)
    }
  }
}
</script>
<template>
  <div class='fullscreen dialog' @touched.prevent="clickedOption(999)" @click="clickedOption(999)">
    <button class='deleteBlockBtn' @touched.prevent="clickedOption(0)" @click="clickedOption(0)">刪除</button>
   <button class='cancleBlockBtn' >取消</button>
  </div>
</template>
<style scoped>
.fullscreen {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  backdrop-filter: none;
}
.dialog {
  z-index: 3;
  backdrop-filter: blur(10px);
}
.dialog > button {
  position: relative;
  display: block;
  width: 80%;
  height: 30px;
  margin-bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  top: 50%;
}
</style>
