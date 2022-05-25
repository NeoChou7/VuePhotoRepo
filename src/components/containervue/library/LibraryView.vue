<script>
// import fetchWS from '@/fetchWS.js'
import modal from '../../Modal.vue'
import { mapGetters } from 'vuex'
import stateType from '@/Types'
export default {
  name: 'libraryView',
  components: {
    modal
  },
  data () {
    return {
      sentinelDate: ''
    }
  },
  methods: {
    getxsImgFullPath: function (name) {
      return this.$serverHostPath + '/image-xs/' + name
    },
    onImgClick (index) {
      // if imgbrowser 放大
      switch (this.$store.state.stateType) {
        case stateType.ImgBrowser:
          this.$store.dispatch('openImgFullScreen', index)
          break
        case stateType.ImgSelected:
          this.$store.dispatch('clickedImg', index)
          break
      }
    },
    closeFullImg () {
      this.$store.dispatch('closeImgFullScreen')
    },
    didShowBrowserDateInfo (imgName, index) {
      console.log(this.sentinelDate)
      if (index % 3 === 0 && this.sentinelDate !== imgName.substring(0, 8)) {
        this.sentinelDate = imgName.substring(0, 8)
        return true
      }
      return false
    }
    // fullImg: function (event) {
    //   // event.preventDefault()
    //   this.isShowFullImg = true
    //   // 取 name
    //   let element = event.target
    //   // let nextElement = element.nextSibling
    //   // let previousElement = element.previousSibling
    //   let name = element.getAttribute('name')
    //   this.fullImgIndex = this.imgNames.indexOf(name)

    //   // 清空節點
    //   while (this.$refs.imgContainer.firstChild) {
    //     this.$refs.imgContainer.removeChild(this.$refs.imgContainer.firstChild)
    //   }
    //   // 給初始節
    //   this.$refs.imgContainer.appendChild(
    //     this.createImgNode(this.fullImgIndex - 1)
    //   )
    //   this.$refs.imgContainer.appendChild(
    //     this.createImgNode(this.fullImgIndex)
    //   )
    //   this.$refs.imgContainer.appendChild(
    //     this.createImgNode(this.fullImgIndex + 1)
    //   )
    //   // 指定中間
    //   this.$nextTick(function () {
    //     let firstChild = this.$refs.imgContainer.firstChild
    //     let borderW = firstChild.style.borderWidth
    //     this.$refs.imgContainer.parentElement.scrollLeft =
    //       this.$refs.imgContainer.parentElement.offsetWidth + borderW
    //   })
    // },
    // createImgNode (index) {
    //   let _div = document.createElement('div')
    //   _div.setAttribute(this.$options._scopeId, '')
    //   let _img = document.createElement('Img')
    //   _img.setAttribute(this.$options._scopeId, '')
    //   _img.setAttribute('src', this.getFullImgPath(index))
    //   _div.appendChild(_img)
    //   return _div
    // },
    // getFullImgPath (index) {
    //   if (index < 0 || index >= this.imgNames.length) return ''
    //   return this.$serverHostPath + /image/ + this.imgNames[index]
    // },
    // selectImg: function (event) {
    //   event.preventDefault()
    //   let element = event.target
    //   let name = element.getAttribute('name')
    //   if (this.selectedImgs.includes(name)) {
    //     let index = this.selectedImgs.indexOf(name)
    //     this.selectedImgs.splice(index, 1)
    //     element.classList.remove('deleteClick')
    //   } else {
    //     this.selectedImgs.push(name)
    //     element.classList.add('deleteClick')
    //   }
    // },
    // deleteAction () {
    //   fetchWS.wsDeleteImages(this.selectedImgs).then((data) => {
    //     // ws if(刪除成功)
    //     // 刪除
    //     this.selectedImgs.forEach((element) => {
    //       let index = this.imgNames.indexOf(element)
    //       if (index !== -1) {
    //         this.imgNames.splice(index, 1)
    //       }
    //     })
    //     this.selectedImgs = []

    //     // ws if 刪除失敗
    //     // selectBtn.click()
    //     // totalNum.innerHTML = `${content.querySelectorAll('.minDiv').length}張照片`
    //     // selectCount.innerHTML = `已選取${deleteItems.length}張照片`
    //   })
    // },
    // updateData (imgs) {
    //   let limitFilename = this.imgNames[this.imgNames.length - 1]
    //   imgs.forEach((element) => {
    //     if (element >= limitFilename) {
    //       this.imgNames.push(element)
    //     }
    //   })

    //   this.imgNames.sort(function (a, b) {
    //     return a > b ? -1 : 1
    //   })
    // },
    // loadMore () {
    //   let lastFileName = this.imgNames[this.imgNames.length - 1]
    //   fetchWS.wsGetImages(lastFileName).then((jsonData) => {
    //     for (var i in jsonData) {
    //       if (!jsonData.hasOwnProperty(i)) continue
    //       this.imgNames.push(jsonData[i])
    //     }
    //   })
    // },
    // detectTouchEnd () {
    //   let element = event.currentTarget
    //   let leftX = event.currentTarget.scrollLeft
    //   if (leftX < element.clientWidth / 2) {
    //     if (this.fullImgIndex <= 0) {
    //       element.scrollLeft = element.offsetWidth
    //       return
    //     }
    //     // 往上一頁
    //     element.scrollLeft = 0
    //     // 刪除最後
    //     this.$refs.imgContainer.removeChild(this.$refs.imgContainer.lastChild)
    //     this.fullImgIndex = this.fullImgIndex - 1
    //     this.$refs.imgContainer.prepend(
    //       this.createImgNode(this.fullImgIndex - 1)
    //     )
    //     element.scrollLeft = element.offsetWidth
    //     // eElement.insertBefore(newFirstElement, eElement.firstChild);
    //   } else if (leftX > element.clientWidth * 1.5) {
    //     if (this.fullImgIndex >= this.imgNames.length - 1) {
    //       element.scrollLeft = element.offsetWidth
    //       return
    //     }
    //     // 往下一頁
    //     element.scrollLeft = 2 * element.offsetWidth
    //     // 刪除第一
    //     this.$refs.imgContainer.removeChild(this.$refs.imgContainer.firstChild)
    //     this.fullImgIndex = this.fullImgIndex + 1
    //     this.$refs.imgContainer.appendChild(
    //       this.createImgNode(this.fullImgIndex + 1)
    //     )
    //     element.scrollLeft = element.offsetWidth
    //   } else {
    //     // 回本頁
    //     element.scrollLeft = element.offsetWidth
    //   }
    // },
    // convertYYYYMMDDHHMMtoDate (strDate) {
    //   let year = strDate.slice(0, 4)
    //   let month = strDate.slice(4, 6)
    //   let day = strDate.slice(6, 8)
    //   let hour = strDate.slice(8, 10)
    //   let min = strDate.slice(10, 12)
    //   return year + '/' + month + '/' + day + ' ' + hour + ':' + min
    // }
  },
  watch: {
    // imgNames () {
    //   this.$emit('totalCounts', this.imgNames.length)
    // },
    // isSelectedMode () {
    //   this.selectedImgs = []
    // },
    // selectedImgs () {
    //   this.$emit('selectedCounts', this.selectedImgs.length)
    // }
  },
  computed: {
    getImages () {
      return this.$store.state.images
      // return this.$store.getters.getImages
    },
    isShowFullImg () {
      return this.$store.state.stateType === stateType.ImgFullScreen
    },
    ...mapGetters([
      'imgDateInfo',
      'imgCurrentPage',
      'totalCounts',
      'currentFullImgSrc',
      'preFullImgSrc',
      'nextFullImgSrc'
    ]),
    // getPreFullImgPath () {
    //   if (this.fullImgIndex - 1 < 0) return ''
    //   return (
    //     this.$serverHostPath + /image/ + this.imgNames[this.fullImgIndex - 1]
    //   )
    // },
    // getNextFullImgPath () {
    //   if (this.fullImgIndex + 1 > this.imgNames.length - 1) return ''
    //   return (
    //     this.$serverHostPath + /image/ + this.imgNames[this.fullImgIndex + 1]
    //   )
    // },
    // getFullImgInfo () {
    //   if (this.fullImgIndex < 0) return ''
    //   let name = this.imgNames[this.fullImgIndex]
    //   return this.convertYYYYMMDDHHMMtoDate(name)
    // },
    updateDate () {
      if (this.$el === undefined) return this.scrollLocation
      if (this.imgNames === undefined || this.imgNames.length === 0) return ''
      let location = this.scrollLocation / this.$el.offsetHeight
      let index = Math.ceil(this.imgNames.length * location)
      let name = this.imgNames[index]
      return this.convertYYYYMMDDHHMMtoDate(name)
    }
  },
  created () {
    this.$store.dispatch('changeNavigationItem', stateType.ImgBrowser)
    if (!this.$store.state.images.length) {
      this.$store.dispatch('getImages', '')
    }
  },
  mounted () {
    // 撈資料給 imgNames
    // this.imgNames = []
    // fetchWS.wsGetImages().then((jsonData) => {
    //   for (var i in jsonData) {
    //     if (!jsonData.hasOwnProperty(i)) continue
    //     this.imgNames.push(jsonData[i])
    //   }
    // })
  }
}
</script>

<template>
  <div>
    <div
      v-for="(imgs, index) in getImages"
      :class="'minDiv'"
      :key="imgs.name"
      @click="onImgClick(index)"
    >
    <!-- <div v-if="didShowBrowserDateInfo(imgs.name,index)" class="browser-date-info">
      <span>{{sentinelDate}}</span>
    </div> -->
      <img
        :src="getxsImgFullPath(imgs.name)"
        :class="'minImg'"
        :name="imgs.name"
      />
      <div
        v-show="imgs.isSelected"
        :class="['minImg', 'deleteClick']"
        mask
        :name="imgs.name"
      >
        <div class="tickImg"></div>
      </div>
    </div>
    <div class="scrollDate">
      <!-- <div>
        <span>{{updateDate}}</span>
      </div> -->
    </div>
    <div class="intervalBar">
      <span>年</span>
      <span>月</span>
      <span>日</span>
      <span>所有照片</span>
    </div>
    <div v-show="isShowFullImg" :class="['fullscreen', 'fullImg']">
      <div class="fullImgHeader">
        <span id="fullImgTitle">{{ imgCurrentPage }}/{{ totalCounts }}</span
        ><button
          class="closeIcon"
          @click.prevent="closeFullImg"
          @touched.prevent="closeFullImg"
        >
          X
        </button>
      </div>
      <div class="fullImgContent" ><!--@touchend.prevent="detectTouchEnd()"-->
        <!-- <div id="imgContainer" ref="imgContainer"></div> -->
        <div>
          <div>
            <img :src="preFullImgSrc" />
          </div>
          <div>
            <img :src="currentFullImgSrc" />
          </div>
          <div>
            <img :src="nextFullImgSrc" />
          </div>
        </div>
      </div>
      <div class="fullImgFooter">{{ imgDateInfo }}</div>
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
.fullscreen {
  position: absolute;
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

  overflow: scroll;
  overflow-y: hidden;
}
.fullImgContent::-webkit-scrollbar {
  width: 0;
  background-color: transparent;
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
.scrollDate {
  position: absolute;
  top: calc(3rem + 10px);
  left: 10px;
}
.scrollDate > div {
  backdrop-filter: blur(5px);
  border-radius: 25%;
}
.scrollDate span {
  font-weight: bold;
  color: white;
}
.intervalBar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(3rem + 20px);
  backdrop-filter: blur(5px);
  border-radius: 5%;
  color: white;
}
.browser-date-info{
  position: absolute;
  color: white;
  top:-5px;
  z-index: 3;
}
</style>
