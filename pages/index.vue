<template>
  <div class="index-wrap">
    <nuxt-link to="/home" class="homeBtn">网站建设中,点击进入主站</nuxt-link>
    <iframe id="bg-iframe" src="./index_bg.html" class="iframeParent" frameborder="0" width="100%" height="100%"></iframe>
    <!-- 首页通知 -->
    <!-- <NoticeMessige /> -->
  </div>
</template>
<script>
  import NoticeMessige from '../components/NoticeMessige.vue'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: '',
    components: {
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
  .homeBtn{
    position: fixed;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1001;
    &:hover{
      color: rgb(24, 118, 226);
    }
  }
}
</style>