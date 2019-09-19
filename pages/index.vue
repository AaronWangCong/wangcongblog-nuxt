<template>
  <div class="index-wrap">
    <div class="index-wrap-content w">
      <indexVideo class="bilibili" />
      <nuxt-link to="/home" class="homeBtn">网站建设中,进入主站</nuxt-link>
    </div>
    <iframe id="bg-iframe" src="./index_bg.html" class="iframeParent" frameborder="0" width="100%" height="100%"></iframe>
    <!-- 首页通知 -->
    <!-- <NoticeMessige /> -->
  </div>
</template>
<script>
  import NoticeMessige from '../components/NoticeMessige.vue'
  import indexVideo from '../components/video.vue'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: '',
    components: {
      NoticeMessige,
      indexVideo
    },
    props:{
    },
    layout:'',
    data() {
      return {
      }
    },
    computed: {
      ...mapState({
        indexBg: state => state.common.indexBg
      })
    },
    created() {
    },
    mounted() {
      this.getIndexBgA()
    },
    methods: {
      ...mapActions('common', ['getIndexBgA'])
    },
  }
</script>
<style lang="scss">
.index-wrap{
  width: 100%;
  height: 100%;
  #bg-iframe {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: 0;
    overflow: hidden;
  }
  .index-wrap-content{
    position: fixed;
    align-items: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    display: flex;
    z-index: 99999;
    padding: 20px;
    .homeBtn{
      width: 400px;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      &:hover{
        color: rgb(24, 118, 226);
      }
    }
    .bilibili{
      box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0.7);
    }
    @media screen and (max-width: 750px) {
      flex-direction: column;
      width: 100%;
      padding: 0;
      .homeBtn{
        margin-top: 1rem;
        font-size: 0.4rem;
        width: 100%;
      }
    }
  }
}
</style>