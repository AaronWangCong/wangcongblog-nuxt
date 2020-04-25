<template>
  <div class="index-wrap">
    <indexVideo @onClick="onClick" />
    <div v-if="isShowText" class="index-wrap-content">
      <span :class="isAnimate ? 'animated rubberBand infinite' : ''" class="index-logo" @mouseenter="mouseenter" @mouseleave="mouseleave"><img src="../assets/images/favicon.jpg" alt=""></span>
      <h2 class="index-title animated lightSpeedIn fast">Aaron汪聪</h2>
      <div class="index-text">
        <p class="animated slideInLeft fast">乙丑岁赴试并州，道逢捕雁者云：“今旦获一雁，杀之矣。其脱网者悲鸣不能去，竟自投于地而死。”予因买得之，葬之汾水之上，垒石为识，号曰“雁丘”。同行者多为赋诗，予亦有《雁丘词》。旧所作无宫商，今改定之。</p>
        <p class="animated lightSpeedIn fast">问世间，情为何物，直教生死相许？</p>
        <p class="animated slideInLeft fast">天南地北双飞客，老翅几回寒暑。</p>
        <p class="animated lightSpeedIn fast">欢乐趣，离别苦，就中更有痴儿女。</p>
        <p class="animated slideInLeft fast">君应有语：渺万里层云，千山暮雪，只影向谁去？</p>
        <p class="animated lightSpeedIn fast">横汾路，寂寞当年箫鼓，荒烟依旧平楚。</p>
        <p class="animated slideInLeft fast">招魂楚些何嗟及，山鬼暗啼风雨。</p>
        <p class="animated lightSpeedIn fast">天也妒，未信与，莺儿燕子俱黄土。</p>
        <p class="animated slideInLeft fast">千秋万古，为留待骚人，狂歌痛饮，来访雁丘处。</p>
      </div>

      <nuxt-link to="/home" class="homeBtn animated jackInTheBox fast">网站建设中,进入主站</nuxt-link>

      <div class="copyright animated bounceInUp slow">
        <p>AWC Licensed | 版权所有 © 2019  Power by 汪聪</p>
        <p>Copyright © 2019-present AaronWangCong <a href="http://beian.miit.gov.cn" target="_blank">鄂ICP备18027009号-1</a></p>
      </div>
    </div>
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
        isAnimate: false,
        isShowText: true
      }
    },
    computed: {
      ...mapState({
      })
    },
    created() {
      this.getBaiDuTongJiA()
    },
    mounted() {
    },
    methods: {
      ...mapActions('common', ['getBaiDuTongJiA']),

      mouseenter () {
        this.isAnimate = true
      },
      mouseleave () {
        this.isAnimate = false
      },
      onClick () {
        this.isShowText = !this.isShowText
      }
    },
  }
</script>
<style lang="scss">
.index-wrap{
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  .index-wrap-content{
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 1000px;
    text-shadow:5px 2px 6px #000;
    .index-logo{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .index-title{
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      padding: 20px 0;
      margin: 0;
    }
    .index-text{
      color: rgb(243, 242, 239);
      text-align: center;
      p{
        font-size: 18px;
        line-height: 25px;
      }
    }
    .homeBtn {
      font-size: 20px;
      font-weight: bold;
    }
    .copyright{
      text-align: center;
      color: #fff;
      margin-top: 50px;
    }
  }
}
</style>