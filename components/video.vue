<template>
  <div class="">
    <video id="test_video" class="test_video" 
      webkit-playsinline playsinline 
      src="http://res.imtt.qq.com/qqbrowser/js/advideo.mp4" 
      controls="controls" 
      autoplay="autoplay" loop="loop"
      muted="muted"
      preload="auto"
      style="object-fit:fill"
      poster="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566280246958&di=045de135625e007310022788acfcef49&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_gif%2FFN3NPzp5tYvnoK46sJwqzT8nib3dBFOHaYBGsNyunBGTBwWwTMaHtGI5JYjOQ4oA8HnQoNzbEzJPHk4MX8kbrRA%2F640%3Fwx_fmt%3Dgif"
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
      // test_video.play()
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
</style>