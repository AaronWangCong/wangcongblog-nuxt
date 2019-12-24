<template>
  <div class="video-wrap" @mouseover="isPlayBtn = true" @mouseout="isPlayBtn = false" @click="changePlay()">
    <video id="test_video"
      :controls="false"
      autoplay
      loop
      muted
      webkit-playsinline playsinline 
      src="/video/tianqizhizi02.mp4" 
      preload="auto"
      style="object-fit:fill;"
      poster=""
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      x5-video-orientation="landscape|portrait"
      class="test_video">
    <!-- landscape 横屏 -->
    </video>
    <p v-show="isPlayBtn" class="video-pause">{{ changePlayText }}</p>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  layout: "",
  data() {
    return {
      changePlayText: "暂停",
      isPlayBtn: false
    }
  },
  computed: {},
  created() {},
  mounted() {
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        document.querySelector("#test_video").play()
      },
      false
    )
    let width = window.innerWidth
    if (width < 1000) width = 1000
    test_video.style.width = width + "px"
    test_video.style.height = window.innerHeight + "px"
    if (window.innerWidth <= 750) {
      test_video.style.width = window.innerWidth + "px"
    }
    // window.onresize = function(){
    //   test_video.style.width = window.innerWidth/2 + "px"
    //   test_video.style.height = window.innerHeight/2 + "px"
    //   if(window.innerWidth <= 750) {
    //     test_video.style.width = document.innerWidth-20 + "px"
    //   }
    // }
  },
  methods: {
    changePlay() {
      let status = document.querySelector("#test_video").paused
      if (status) {
        document.querySelector("#test_video").play()
        this.changePlayText = "暂停"
      } else {
        document.querySelector("#test_video").pause()
        this.changePlayText = "播放"
      }
    }
  }
}
</script>
<style lang="scss">
.video-wrap {
  position: relative;
  cursor: pointer;
  .video-pause {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    cursor: pointer;
    border: #fff 1px solid;
    color: #fff;
    margin: 0;
    transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
    &:hover {
      color: #07aefc;
      border-color: #07aefc;
    }
  }
}
</style>