<template>
  <div class="blogLayout-wrap">
    <!-- 首页通知 -->
    <Header />
    <div class="content">
      <nuxt />
    </div>
    <Footer />
    <skPlayer />

    <!-- 首页通知 -->
    <NoticeMessige />
  </div>
</template>
<script>
  import skPlayer from '../components/skPlayer.vue'
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  import NoticeMessige from '../components/NoticeMessige.vue'
  export default {
    name: '',
    components: {
      skPlayer,
      Header,
      Footer,
      NoticeMessige
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
.blogLayout-wrap{
  .content{
    padding-top: 80px;
  }
}
</style>
