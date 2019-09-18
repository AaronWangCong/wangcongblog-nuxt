<template>
  <div class="video-wrap">
    <video id="test_video" class="test_video" 
      webkit-playsinline playsinline 
      src="/video/index01.mp4" 
      controls="controls" 
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
      }
    },
    computed: {
    },
    created() {
    },
    mounted() {
      test_video.style.width = window.innerWidth/2 + "px";
      test_video.style.height = window.innerHeight/2 + "px";
      if(window.innerWidth <= 750) {
        test_video.style.width = window.innerWidth-20 + "px";
      }
      test_video.play()
      // console.log(test_video.play())
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
    },
  }
</script>
<style lang="scss">
.video-wrap{
}
</style>