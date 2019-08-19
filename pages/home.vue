<template>
  <div class="home-wrap">
    <!-- <no-ssr> -->
      <full-page ref="fullpage" :options="options" id="fullpage">
        <div class="section part1">
          <span class="toBottom"><i class="iconfont icon-xiangxiajixu"></i></span>
        </div>
        <div class="section part2">
          
          <span class="toBottom"><i class="iconfont icon-xiangxiajixu"></i></span>
        </div>
        <div class="section part3">
          <span class="toBottom"><i class="iconfont icon-xiangxiajixu"></i></span>
        </div>
        <div class="section part4">
        </div>
      </full-page>
    <!-- </no-ssr> -->
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
        options: {
          menu: '#menu',
          easingcss3: 'cubic-bezier(.77,.04,0,.99)',
          anchors: ['part1','part2','part3','part4'],
          navigation: true,
          navigationPosition: 'right',
          scrollingSpeed: 1000,
          afterLoad: this.afterLoad,
          onLeave: this.onLeave
        },
      }
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
      onLeave(origin, destination, direction) {
        let anchor = destination.anchor
      },
      afterLoad(origin, destination, direction) {
        let anchor = destination.anchor
        switch(anchor) {
          // case 'part1': console.log(anchor);this.resetAnimate();break;
          // case 'part2': this.resetAnimate();this.isShowPart1 = true;break;
          // case 'part3': this.resetAnimate();this.isShowPart2 = true;break;
          // case 'part4': this.resetAnimate();this.isShowPart3 = true;break;
        }
      }
    },
  }
</script>
<style lang="scss">
@import '~/assets/scss/pc/home.scss';
</style>