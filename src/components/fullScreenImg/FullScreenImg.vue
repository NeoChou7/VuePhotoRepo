<template>
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
    <div
      class="fullImgContent"
      @touchstart="moveStart"
      @touchmove="moveTouch"
      @touchend="moveEnd"
      @click="test"
      ref="content"
    >
      <div id="preView" ref="preView">
        <img :src="preFullImgSrc" />
      </div>
      <div id="currentView" ref="currentView">
        <img :src="currentFullImgSrc" />
      </div>
      <div id="nextView" ref="nextView">
        <img :src="nextFullImgSrc" />
      </div>
    </div>
    <div class="fullImgFooter">{{ imgDateInfo }}</div>
  </div>
</template>
<script>
import { moveDirection, stateType, pageDirection } from '@/Types'
import { mapGetters } from 'vuex'
export default {
  name: 'fullScreenImg',
  data () {
    return {
      oldX: 0
    }
  },
  computed: {
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
    ])
  },
  methods: {
    closeFullImg () {
      this.$store.dispatch('closeImgFullScreen')
    },
    moveStart (e) {
      this.oldX = e.changedTouches[0].pageX
    },
    moveTouch (e) {
      // 判斷左滑右滑
      let { direction: moveDir, movePoint } = this.swipeDirection(
        e.changedTouches[0].pageX
      )
      // 判斷對右側照片還是左側照片做移動
      let pageDir = this.pageDirection()
      if (pageDir === pageDirection.NONE && moveDir === moveDirection.Right) {
        // 上一頁
        // 對左側頁面右移
        this.pagePre(movePoint)
      } else if (
        pageDir === pageDirection.NONE &&
        moveDir === moveDirection.Left
      ) {
        // 下一頁
        // 對右側頁面左移
        this.pageNext(movePoint)
      } else if (pageDir === pageDirection.PrePage) {
        // 上一頁
        this.pagePre(movePoint)
      } else if (pageDir === pageDirection.NextPage) {
        // 下一頁
        this.pageNext(movePoint)
      }

      // 左滑 中間右邊照片往左
    },
    moveEnd () {
      let pageDir = this.pageDirection()
      this.$refs.preView.style.transition = 'left 0.5s'
      this.$refs.nextView.style.transition = 'left 0.5s'
      if (this.didChangePage()) {
        if (pageDir === pageDirection.PrePage) {
          this.$refs.currentView.style.left =
            this.$refs.currentView.clientWidth * 2 + 'px'
          this.$refs.preView.style.left = this.$refs.preView.clientWidth + 'px'
        } else {
          this.$refs.currentView.style.left = '0px'
          this.$refs.nextView.style.left =
            this.$refs.nextView.clientWidth + 'px'
        }

        setTimeout(() => {
          this.$refs.preView.style.transition = 'left 0s'
          this.$refs.nextView.style.transition = 'left 0s'
          this.$store.dispatch('pageImgFullScreen', pageDir)
          this.defaultPosition()
        }, 500)
      } else {
        this.defaultPosition()
        this.$refs.preView.style.transition = 'left 0s'
        this.$refs.nextView.style.transition = 'left 0s'
      }
    },
    defaultPosition () {
      this.$refs.currentView.style.left = ''

      this.$refs.preView.style.left = ''

      this.$refs.nextView.style.left = ''
    },
    // swipeMovePoint (locationX) {
    //   return location - this.oldX
    // },
    swipeDirection (locationX) {
      //   console.log('new: ' + locationX + ',old: ' + this.oldX)
      let direction = moveDirection.NONE
      let movePoint = 0
      if (locationX > this.oldX) {
        direction = moveDirection.Right
      } else if (locationX < this.oldX) {
        direction = moveDirection.Left
      }
      movePoint = locationX - this.oldX
      this.oldX = locationX
      return { direction, movePoint }
    },
    pageDirection () {
      let { left } = this.$refs.currentView.getBoundingClientRect()
      if (left < 0) {
        return pageDirection.NextPage
      } else if (left > 0) {
        return pageDirection.PrePage
      } else {
        return pageDirection.NONE
      }
    },
    didChangePage () {
      let { width, left } = this.$refs.currentView.getBoundingClientRect()
      let moveShift = Math.abs(left)
      return moveShift > width * 0.35
    },
    test () {
      //   this.pagePre(1)
      // this.$refs.preView.style.transition = 'left 0.5s'
    },
    pagePre (movedPoint) {
      let moveP = Math.round(movedPoint)
      this.$refs.currentView.style.left =
        this.$refs.currentView.offsetLeft + moveP + 'px'
      this.$refs.preView.style.left =
        this.$refs.preView.offsetLeft + moveP + 'px'
    },
    pageNext (movedPoint) {
      this.$refs.currentView.style.left =
        this.$refs.currentView.offsetLeft + movedPoint + 'px'
      this.$refs.nextView.style.left =
        this.$refs.nextView.offsetLeft + movedPoint + 'px'
    }
  }
}
</script>
<style scoped>
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
  position: absolute;
  top: 0px;
  width: 100vw;
  height: 3rem;
  color: white;
  text-align: center;
  line-height: 3rem;
  z-index: 4;
}
.fullImgHeader .closeIcon {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
}
.fullImgContent {
  position: absolute;
  top: 0px;
  height: calc(100%);
  width: calc(100% * 3);
  left: calc(-100vw);
  /*
  overflow: scroll;
  overflow-y: hidden; */
  overflow: hidden;
  /* border: 5px blue solid; */
}
.fullImgContent #preView {
  position: absolute;
  left: 0;
  width: calc(100vw);
  height: 100vh;
  /* transition: left 0.5s; */
  /* border: 5px red solid; */
}
.fullImgContent #currentView {
  position: absolute;
  left: calc(100vw);
  width: calc(100vw);
  height: 100vh;
  /* border: 5px red solid; */
}
.fullImgContent #nextView {
  position: absolute;
  left: calc(100vw * 2);
  width: calc(100vw);
  height: 100vh;
  /* transition: left 0.5s; */
  /* border: 5px red solid; */
}

/* .fullImgContent > div > div {
  flex: 1;
  width: calc(100vw);
  border: 5px red solid;
} */
.fullImgContent img {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.fullImgFooter {
  position: absolute;
  bottom: 0px;
  width: 100vw;
  height: 3rem;
  color: white;
  text-align: center;
  line-height: 3rem;
}
</style>
