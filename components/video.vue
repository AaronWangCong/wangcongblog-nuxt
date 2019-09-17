<template>
  <div class="video-wrap">
    <video id="test_video" class="test_video" 
      webkit-playsinline playsinline 
      src="http://upos-hz-mirrorcosu.acgvideo.com/upgcxcode/05/35/116583505/116583505-1-6.mp4?e=ig8euxZM2rNcNbRMhwdVhoM17wdVhwdEto8g5X10ugNcXBB_&deadline=1568719541&gen=playurl&nbs=1&oi=1001285881&os=cosu&platform=html5&trid=abb7a80f1b5a4b74a7e8f890d914bc6d&uipk=5&upsig=9fad71dcd4934ea566003611fca02849&uparams=e,deadline,gen,nbs,oi,os,platform,trid,uipk&mid=0" 
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
      test_video.style.width = window.innerWidth + "px";
      test_video.style.height = window.innerHeight + "px";
      test_video.play()
      // console.log(test_video.play())
      window.onresize = function(){
        // test_video.style.width = window.innerWidth + "px";
        // test_video.style.height = window.innerHeight + "px";
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