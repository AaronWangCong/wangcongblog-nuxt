<template>
  <div class="blogLayout-wrap">
    <Header />
    <div class="content">
      <nuxt />
    </div>
    <skPlayer />
  </div>
</template>
<script>
  import skPlayer from '../components/skPlayer.vue'
  import Header from '../components/header.vue'
  export default {
    name: '',
    components: {
      skPlayer,
      Header
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
      this.changeRem();
      // 百度自动推送
      (function(){
        let bp = document.createElement('script');
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        let s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
      })();
    },
    methods: {
      changeRem() {
        var html = document.documentElement;
        var width = html.getBoundingClientRect().width;
        html.style.fontSize = width / 7.5 + "px";
        //1rem=100;
      }
    },
  }
</script>
<style lang="scss">
.blogLayout-wrap{
  .content{
    padding-top: 80px;
  }
}
</style>
