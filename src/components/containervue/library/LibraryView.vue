<script>
import fetchWS from '@/fetchWS.js'
import modal from '../../Modal.vue'
export default {
  name: 'libraryView',
  props: {
    isSelectedMode: {
      type: Boolean
    }
  },
  components: {
    modal
  },
  data () {
    return {
      imgNames: ['20220510090517364.png'],
      selectedImgs: [],
      isShowFullImg: false,
      fullImgIndex: -1
    }
  },
  methods: {
    getFullPath: function (name) {
      return this.$serverHostPath + '/image-xs/' + name
    },
    fullImg: function (event) {
      // event.preventDefault()
      this.isShowFullImg = true
      // 取 name
      let element = event.target
      // let nextElement = element.nextSibling
      // let previousElement = element.previousSibling
      let name = element.getAttribute('name')
      this.fullImgIndex = this.imgNames.indexOf(name)

      // 清空節點
      while (this.$refs.imgContainer.firstChild) {
        this.$refs.imgContainer.removeChild(this.$refs.imgContainer.firstChild)
      }
      // 給初始節
      this.$refs.imgContainer.appendChild(this.createImgNode(this.fullImgIndex - 1))
      this.$refs.imgContainer.appendChild(this.createImgNode(this.fullImgIndex))
      this.$refs.imgContainer.appendChild(this.createImgNode(this.fullImgIndex + 1))
      // 指定中間
      this.$nextTick(function () {
        let firstChild = this.$refs.imgContainer.firstChild
        console.log(firstChild)

        let borderW = firstChild.style.borderWidth
        this.$refs.imgContainer.parentElement.scrollLeft = this.$refs.imgContainer.parentElement.offsetWidth + borderW
      })

      // <div>
      //       <img :src="getPreFullImgPath" />
      //     </div>
      //     <div>
      //       <img :src="getFullImgPathByIndex()" />
      //     </div>
      //     <div>
      //       <img :src="getNextFullImgPath" />
      //     </div>
    },
    createImgNode (index) {
      let _div = document.createElement('div')
      _div.setAttribute(this.$options._scopeId, '')
      let _img = document.createElement('Img')
      _img.setAttribute(this.$options._scopeId, '')
      _img.setAttribute('src', this.getFullImgPath(index))
      _div.appendChild(_img)
      return _div
    },
    getFullImgPath (index) {
      if (index < 0) return ''
      return this.$serverHostPath + /image/ + this.imgNames[index]
    },
    closeFullImg () {
      this.isShowFullImg = false
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
        this.selectedImgs.forEach((element) => {
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
    },
    updateData (imgs) {
      let limitFilename = this.imgNames[this.imgNames.length - 1]
      imgs.forEach((element) => {
        if (element >= limitFilename) {
          this.imgNames.push(element)
        }
      })

      this.imgNames.sort(function (a, b) {
        return a > b ? -1 : 1
      })
    },
    loadMore () {
      let lastFileName = this.imgNames[this.imgNames.length - 1]
      fetchWS.wsGetImages(lastFileName).then((jsonData) => {
        for (var i in jsonData) {
          if (!jsonData.hasOwnProperty(i)) continue
          this.imgNames.push(jsonData[i])
        }
      })
    },
    detectTouchEnd () {
      let element = event.currentTarget
      let leftX = event.currentTarget.scrollLeft
      if (leftX < element.clientWidth / 2) {
        if (this.fullImgIndex <= 0) {
          element.scrollLeft = element.offsetWidth
          return
        }
        // 往上一頁
        element.scrollLeft = 0
        // 刪除最後
        console.log(this.$refs.imgContainer.lastChild)
        this.$refs.imgContainer.removeChild(this.$refs.imgContainer.lastChild)
        this.fullImgIndex = this.fullImgIndex - 1
        this.$refs.imgContainer.prepend(this.createImgNode(this.fullImgIndex - 1))
        element.scrollLeft = element.offsetWidth
        // eElement.insertBefore(newFirstElement, eElement.firstChild);
      } else if (leftX > element.clientWidth * 1.5) {
        if (this.fullImgIndex >= this.imgNames.length) {
          element.scrollLeft = element.offsetWidth
          return
        }
        // 往下一頁
        element.scrollLeft = 2 * element.offsetWidth
        // 刪除第一
        this.$refs.imgContainer.removeChild(this.$refs.imgContainer.firstChild)
        this.fullImgIndex = this.fullImgIndex + 1
        this.$refs.imgContainer.appendChild(this.createImgNode(this.fullImgIndex + 1))
        element.scrollLeft = element.offsetWidth
      } else {
        // 回本頁
        element.scrollLeft = element.offsetWidth
      }
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
  computed: {
    getPreFullImgPath () {
      if (this.fullImgIndex - 1 < 0) return ''
      return (
        this.$serverHostPath + /image/ + this.imgNames[this.fullImgIndex - 1]
      )
    },
    getNextFullImgPath () {
      if (this.fullImgIndex + 1 > this.imgNames.length - 1) return ''
      return (
        this.$serverHostPath + /image/ + this.imgNames[this.fullImgIndex + 1]
      )
    },

    getFullImgInfo () {
      if (this.fullImgIndex < 0) return ''
      let name = this.imgNames[this.fullImgIndex]
      let year = name.slice(0, 4)
      let month = name.slice(4, 6)
      let day = name.slice(6, 8)
      let hour = name.slice(8, 10)
      let min = name.slice(10, 12)
      return year + '/' + month + '/' + day + ' ' + hour + ':' + min
    }
  },
  mounted () {
    // 撈資料給 imgNames
    this.imgNames = []
    fetchWS.wsGetImages().then((jsonData) => {
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
        @touchend.prevent="fullImg($event)"
        @click.prevent="fullImg($event)"
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
    <div v-show="isShowFullImg" :class="['fullscreen', 'fullImg']" >
      <div class="fullImgHeader">
        <span id="fullImgTitle"
          >{{ fullImgIndex + 1 }}/{{ imgNames.length }}</span
        ><button
          class="closeIcon"
          @click.prevent="closeFullImg"
          @touched.prevent="closeFullImg"
        >
          X
        </button>
      </div>
      <div class="fullImgContent" @touchend="detectTouchEnd()">
        <div id="imgContainer" ref="imgContainer"></div>
      </div>
      <div class="fullImgFooter">{{ getFullImgInfo }}</div>
    </div>
    <!-- <modal v-show="isShowFullImg"/> -->
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
.fullscreen {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
}
.fullImg {
  z-index: 3;
  background-color: black;
}
.fullImgHeader {
  position: relative;
  height: 3rem;
  color: white;
  text-align: center;
  line-height: 3rem;
}
.fullImgHeader .closeIcon {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
}
.fullImgContent {
  height: calc(100% - 6rem);
  width: calc(100%);

  overflow:scroll;
  overflow-y:hidden;
}
.fullImgContent::-webkit-scrollbar{
    width:0;
    background-color:transparent;
}
.fullImgContent > div {
  height: calc(100%);

  display: flex;
  width: calc(3 * 100%);
  border: 5px blue solid;
}
.fullImgContent > div > div {
  /* height: calc(100% - 6rem); */

  flex: 1;
  width: calc(100vw);
  border: 5px red solid;
}
.fullImgContent img {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.fullImgFooter {
  height: 3rem;
  color: white;
  text-align: center;
  line-height: 3rem;
}
</style>
