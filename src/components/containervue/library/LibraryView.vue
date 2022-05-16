<script>
import fetchWS from '@/fetchWS.js'
export default {
  name: 'libraryView',
  props: {
    isSelectedMode: {
      type: Boolean
    }
  },
  data () {
    return {
      serverHostPath: 'http://localhost:8080',
      imgNames: ['20220510090517364.png'],
      selectedImgs: []
    }
  },
  methods: {
    getFullPath: function (name) {
      return this.serverHostPath + '/image-xs/' + name
    },
    fullImg: function (event) {
      event.preventDefault()
      console.log('fullImg')
    },
    selectImg: function (event) {
      event.preventDefault()
      let element = event.target
      let name = element.getAttribute('name')
      if (this.selectedImgs.includes(name)) {
        let index = this.selectedImgs.indexOf(name)
        this.selectedImgs.splice(index, 1)
        element.classList.remove('deleteClick')
      } else {
        this.selectedImgs.push(name)
        element.classList.add('deleteClick')
      }
    },
    deleteAction () {
      fetchWS.wsDeleteImages(this.selectedImgs).then((data) => {
        console.log(data)
        // ws if(刪除成功)
        // 刪除
        this.selectedImgs.forEach(element => {
          let index = this.imgNames.indexOf(element)
          if (index !== -1) {
            this.imgNames.splice(index, 1)
          }
        })
        this.selectedImgs = []

        // ws if 刪除失敗
        // selectBtn.click()
        // totalNum.innerHTML = `${content.querySelectorAll('.minDiv').length}張照片`
        // selectCount.innerHTML = `已選取${deleteItems.length}張照片`
      })
    }
  },
  watch: {
    imgNames () {
      this.$emit('totalCounts', this.imgNames.length)
    },
    isSelectedMode () {
      this.selectedImgs = []
    },
    selectedImgs () {
      this.$emit('selectedCounts', this.selectedImgs.length)
    }
  },
  mounted: function () {
    // 撈資料給 imgNames
    this.imgNames = []
    fetchWS.wsGetImages().then(jsonData => {
      for (var i in jsonData) {
        if (!jsonData.hasOwnProperty(i)) continue
        this.imgNames.push(jsonData[i])
      }
    })
  }
}
</script>

<template>
  <div>
    <div v-for="name in imgNames" :class="'minDiv'" :key="name">
      <img
        :src="getFullPath(name)"
        :class="'minImg'"
        @touchend="fullImg"
        @click="fullImg"
        :name="name"
      />
      <div
        v-show="isSelectedMode"
        class="minImg"
        mask
        @touchend="selectImg"
        @click="selectImg"
        :name="name"
      >
        <div class="tickImg"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.minDiv {
  position: relative;
  width: calc(100% / 3 - 0.2em);
  height: calc(100vw / 3 - 0.2em);
  display: inline-block;
  margin: 0 0.1em;
}
.minImg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.deleteClick {
  backdrop-filter: brightness(50%);
}
.deleteClick .tickImg {
  position: absolute;
  width: 15%;
  height: 15%;
  bottom: 5px;
  right: 5px;
  background-image: url("~@/assets/tickImg.png");
  background-size: contain;
}
</style>
