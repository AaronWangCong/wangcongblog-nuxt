<template>
  <div class="video-wrap" @mouseover="isPlayBtn = true" @mouseout="isPlayBtn = false" @click="changePlay()">
    <video id="test_video" class="test_video" 
      webkit-playsinline playsinline 
      src="/video/index01.mp4" 
      :controls="false"
      autoplay="autoplay" loop="loop"
      muted="muted"
      preload="auto"
      style="object-fit:fill"
      poster="https://i1.hdslb.com/bfs/archive/ee1a6db6ad1465ae3e338dd913b2ebe2fa2eb78b.jpg"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      x5-video-orientation="landscape|portrait">
      <!-- landscape 横屏 -->
    </video>
    <p v-show="isPlayBtn" class="video-pause">{{ changePlayText }}</p>
  </div>
</template>

<script>
  export default {
    name: '',
    components: {
    },
    props:{
    },
    layout:'',
    data() {
      return {
        changePlayText: '播放',
        isPlayBtn: false
      }
    },
    computed: {
    },
    created() {
    },
    mounted() {
      document.querySelector('#test_video').paused ? this.changePlayText = '暂停' : this.changePlayText = '播放'
      document.addEventListener("WeixinJSBridgeReady", function () {
        document.querySelector('#test_video').play()
      }, false);
      test_video.style.width = window.innerWidth/2 + "px";
      test_video.style.height = window.innerHeight/2 + "px";
      if(window.innerWidth <= 750) {
        test_video.style.width = window.innerWidth-20 + "px";
      }
      window.onresize = function(){
        test_video.style.width = window.innerWidth/2 + "px";
        test_video.style.height = window.innerHeight/2 + "px";
        if(window.innerWidth <= 750) {
          test_video.style.width = window.innerWidth-20 + "px";
          test_video.style.height = window.innerHeight/2-20 + "px";
        }
      }
    },
    methods: {
      changePlay() {
        let status = document.querySelector('#test_video').paused
        if(status) {
          document.querySelector('#test_video').play()
          this.changePlayText = '暂停'
        } else {
          document.querySelector('#test_video').pause()
          this.changePlayText = '播放'
        }
      }
    },
  }
</script>
<style lang="scss">
.video-wrap{
  position: relative;
  .video-pause{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 10px 20px;
    cursor: pointer;
    border: #fff 1px solid;
    color: #fff;
    margin: 0;
    transition: all .6s cubic-bezier(.215,.61,.355,1) 0s;
    &:hover{
      color: #07aefc;
      border-color: #07aefc;
    }
  }
}
</style>