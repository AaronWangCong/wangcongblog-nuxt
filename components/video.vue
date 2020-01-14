<template>
  <div class="video-wrap" @click="showText()">
    <video id="index-video" autoplay loop muted class="index-video">
      <source src="/video/愤怒的小鸟愤怒的舔屏.mp4" type="video/mp4" >
    </video>
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
    }
  },
  computed: {},
  created() {},
  mounted() {
    window.onresize = function(){
      document.querySelector('#index-video').style.width = window.innerWidth + "px"
      document.querySelector('#index-video').style.height = window.innerHeight + "px"
    }
  },
  methods: {
    showText () {
      this.$emit('onClick')
    }
  }
}
</script>
<style lang="scss">
.video-wrap {
  width: 100%;
  height: 100%;
  .index-video{
    position: fixed;  
    left: 0;
    top: 0;
    min-width: 100%;  
    min-height: 100%;  
    height: auto;  
    width: auto;  
    object-fit:fill;
    /*加滤镜*/
    /*filter: blur(15px); //背景模糊设置 */
    /*-webkit-filter: grayscale(100%);*/ 
    /*filter:grayscale(100%); //背景灰度设置*/ 
    z-index:1;
    source{  
      min-width: 100%;  
      min-height: 100%;  
      height: auto;  
      width: auto;  
    }
  }
}
</style>