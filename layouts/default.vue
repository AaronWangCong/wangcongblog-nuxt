<template>
  <div class="default-wrap">
    <div class="content">
      <nuxt />
    </div>
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
</style>
