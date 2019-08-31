<template>
  <div class="default-wrap">
    <div class="content">
      <nuxt />
    </div>
    <skPlayer />
  </div>
</template>
<script>
  import skPlayer from '../components/skPlayer.vue'
  export default {
    name: '',
    components: {
      skPlayer
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
    },
    methods: {
      changeRem() {
        var html = document.documentElement;
        var width = html.getBoundingClientRect().width;
        html.style.fontSize = width / 7.5 + "px";
        //1rem=100;
      }
    }
  }
</script>
<style lang="scss">
</style>
