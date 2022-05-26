<script>
import {mapGetters} from 'vuex'
export default{
  name: 'navOperator',
  props: {
    operateCounts: {
      type: Number,
      default: 0
    },
    containerType: {
      type: String
    }
  },
  computed: {
    typeName () {
      let name = ''
      switch (this.containerType) {
        case 'Library':
          name = '照片'
          break
        case 'Videos':
          name = '影片'
          break
        case 'Album':
          name = '相簿'
          break
        default:
          name = '照片'
      }
      return name
    },
    ...mapGetters(['imgSelectedCount', 'imgSelectedCountUnit'])
  },
  methods: {
    PopTrashDialog () {
      // this.$emit('clickedTrash')
      this.$store.dispatch('clickedDeleteBtn')
    }
  }

}
</script>
<template>
  <div class='selectItems'>
    <span id="selectCount">已選取{{imgSelectedCount}}{{imgSelectedCountUnit}}</span>
    <i class="fa-solid fa-cloud-arrow-down export"></i>
    <i id='trashCanBtn' class="fa-solid fa-trash trashcan" @click="PopTrashDialog"></i>
  </div>
</template>
<style scoped>
.selectItems {
  position: fixed;
  height: 3rem;
  width: 100%;
  bottom: 0px;
  text-align: center;
  line-height: 3rem;
  z-index: 1;
  backdrop-filter: blur(10px);
}
.export {
  position: absolute;
  line-height: inherit;
  left: calc(3rem / 4);
}
.trashcan {
  position: absolute;
  line-height: inherit;
  right: calc(3rem / 4);
}
</style>
