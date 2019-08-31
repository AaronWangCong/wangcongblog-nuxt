<template>
  <div class="home-wrap">
    <div class="home-wrap-banner">
      <!-- 移动端显示 -->
      <a-carousel class="m-carousel" autoplay>
        <div class="m-carousel-item" v-for="(item,index) in bannerInfo" :key="index" :style="item.background"><h2>{{ item.h2 }}</h2></div>
      </a-carousel>

      <!-- pc及平板显示 -->
      <div class="carousel pc-carousel">
        <div class="carousel-inner-view">
          <div class="carousel-inner" :class="{ anim:animate === true }">
            <div class="carousel-inner-item" v-for="(item,index) in bannerInfo" :key="index" :style="item.background">
              <nuxt-link to="/home">
                <div class="item-text" :class="{ on: slideIndex +1 === index }">
                  <header class="item-text-title">
                    <p>
                      <span><img src="../assets/images/photo.jpg" alt="">Aaron</span>
                      <span><span v-for="label in item.category" :key="label">{{ label }}</span></span>
                    </p>
                    <h2>{{ item.title }}</h2>
                  </header>
                  <div class="item-text-content">{{ item.content }}</div>
                  <div class="item-text-footer">
                    <span class="last-update">{{ item.lastUpdate }}</span>
                    <span class="see-time"><i class="iconfont icon-liulan"></i> {{ item.see }}</span>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
        <ul class="carousel-control pa">
          <li v-for="(item,index) in bannerInfo.length-2" :key="index" :class="{ on: slideIndex === index }" @click="handleSlide(index)"><span></span></li>
        </ul>
      </div>
    </div>

    <div class="home-wrap-slogan">
      <div class="w">
        <div class="blue"><i class="iconfont icon-huati"></i> 通知</div>
        <message-carousel :data-list="messageList">
          <template slot-scope="{ row }">
            <nuxt-link :to="{ path: '/home',params: { tabIndex: 1 } }" tag="div" class="message-box ellipsis" :style="'color:' + row.color">
              <span class="message-date">{{ row.date }}</span>&nbsp;&nbsp;&nbsp;&nbsp;{{ row.content }}
            </nuxt-link>
          </template>
        </message-carousel>
      </div>
    </div>

    <div class="home-wrap-category">
      <div class="w">
        <h2 class="part-title">文章分类</h2>
        <div class="card-item-box">
          <div class="card-item card-item1" @click="goCardDetail('基础理论')">
            <div class="card-item-bg"></div>
            <div class="card-item-text">
              <p>125篇</p>
              <h2>基础理论-要点学习</h2>
              <span>HTML、CSS、JS</span>
            </div>
          </div>
          <div class="card-item card-item2" @click="goCardDetail('深入技术')">
            <div class="card-item-bg"></div>
            <div class="card-item-text">
              <p>125篇</p>
              <h2>深入技术-个人解读</h2>
              <span>JavaScript高级</span>
            </div>
          </div>
          <div class="card-item card-item3" @click="goCardDetail('框架运用')">
            <div class="card-item-bg"></div>
            <div class="card-item-text">
              <p>125篇</p>
              <h2>框架运用-学以致用</h2>
              <span>VUE、Nuxt、Node</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home-wrap-card">
      <div class="w">
        <h2 class="part-title">最新文章</h2>
        <div class="card-item-box">
          <div class="card-item" v-for="(item, index) in cardInfo" :key="index">
            <article>
              <div class="article-img" :class="isShowImg ? 'lazyloaded' : ''"><img v-lazy="item.url" alt=""></div>
              <div class="article-text">
                <div class="article-text-photo"><span><img src="../assets/images/photo.jpg" alt=""></span></div>
                <div class="article-text-tag"><span v-for="label in item.category" :key="label">{{ label }}</span></div>
                <div class="article-text-title">{{ item.title }}</div>
                <div class="article-text-content">{{ item.content }}</div>
                <div class="article-text-footer">
                  <span class="last-update">{{ item.lastUpdate }}</span>
                  <span class="see-time"><i class="iconfont icon-liulan"></i> {{ item.see }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import banner01 from '../assets/images/banner/banner01.jpg'
  import banner02 from '../assets/images/banner/banner02.jpg'
  import banner03 from '../assets/images/banner/banner03.jpg'
  import banner04 from '../assets/images/banner/banner04.jpg'
  import banner05 from '../assets/images/banner/banner05.jpg'
  import AutoCarousel from '~/components/autoCarousel.vue'
  import { mapState } from 'vuex'
  export default {
    name: '',
    components: {
      'message-carousel': AutoCarousel,
    },
    props:{
    },
    layout:'blogLayout',
    data() {
      return {
        slideIndex: 0,
        bannerInfo: [
          { h2: '1',background: 'background: url(' + banner01 + ') no-repeat;', url: banner01, category: ['Vue','Vuex'], see: '20', title: 'Vuex实现数据状态管理！', lastUpdate:'2019年10月12日', content:'Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。' },
          { h2: '2',background: 'background: url(' + banner02 + ') no-repeat;', url: banner02, category: ['Webhooks','部署'], see: '56', title: 'webhooks实现自动部署!', lastUpdate:'2019年9月22日', content:'Webhooks允许在发生特定事件时通知外部服务。 当指定的事件发生时，我们将向您提供的每个URL发送POST请求。通过这个post请求，我们就能实现自动拉取仓库中的代码，更新到本地，最终实现自动化更新。' },
          { h2: '3',background: 'background: url(' + banner03 + ') no-repeat;', url: banner03, category: ['JavaScript'], see: '42', title: 'JS实现倒计时!', lastUpdate:'2019年8月30日', content:'倒计时业务需求广泛，特别在电商网站中使用较多，用来对于商品的倒计时优惠及抢购，我们这里以倒计时欠费通知为业务背景，做一个到期前七天提醒及到期后禁止使用的倒计时。为保证时间的正确性需要后台返回服务器当前时间，及活动结束时间。' },
          { h2: '4',background: 'background: url(' + banner04 + ') no-repeat;', url: banner04, category: ['杂谈','咸鱼'], see: '83', title: '为什么一个人的时候容易异想天开？', lastUpdate:'2019年7月10日', content:'每个人都有自己固有的思想，对工作的、对生活的、对爱情的以及对周围事物的。然而都没有在一个人放空大脑的时候想的彻底，想的天马行空。其实每个人都有自己心底最深的一滩水，纵然外表光鲜、情绪波动。' },
        ],
        messageList: [
          { id: 1,date: '12-03',content: '欢迎来到Aaron汪聪的个人网站！', color: '#f728c3' },
          { id: 2,date: '12-05',content: '微博知乎占头条谁与争锋，桌面移动待前端一统江湖!', color: '#3c90f0' },
          { id: 3,date: '12-20',content: '圣诞来临，元旦即到，新春不远，你获得了什么！', color: '#f36b2c' }
        ],
        cardInfo: [
          { url: banner01, category: ['杂谈','咸鱼'], see: '83', title: '有些路，我只想和你一起走!', lastUpdate:'2019年7月10日', content:'我们这一生会遇到很多人，有的人教你成熟，有的人教你独立。 无论是遇到让你在我们这一生会遇到很多人，有的人教你成熟，有的人教你独立。 无论是遇到让你在' },
          { url: banner02, category: ['Vue','Vuex'], see: '20', title: 'Vuex实现数据状态管理！', lastUpdate:'2019年10月12日', content:'Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。' },
          { url: banner03, category: ['Webhooks','部署'], see: '56', title: 'webhooks实现自动部署!', lastUpdate:'2019年9月22日', content:'Webhooks允许在发生特定事件时通知外部服务。 当指定的事件发生时，我们将向您提供的每个URL发送POST请求。通过这个post请求，我们就能实现自动拉取仓库中的代码，更新到本地，最终实现自动化更新。' },
          { url: banner04, category: ['JavaScript'], see: '42', title: 'JS实现倒计时!', lastUpdate:'2019年8月30日', content:'倒计时业务需求广泛，特别在电商网站中使用较多，用来对于商品的倒计时优惠及抢购，我们这里以倒计时欠费通知为业务背景，做一个到期前七天提醒及到期后禁止使用的倒计时。为保证时间的正确性需要后台返回服务器当前时间，及活动结束时间。' },
          { url: banner05, category: ['杂谈','咸鱼'], see: '83', title: '为什么一个人的时候容易异想天开？', lastUpdate:'2019年7月10日', content:'每个人都有自己固有的思想，对工作的、对生活的、对爱情的以及对周围事物的。然而都没有在一个人放空大脑的时候想的彻底，想的天马行空。其实每个人都有自己心底最深的一滩水，纵然外表光鲜、情绪波动。' },

          { url: banner01, category: ['杂谈','咸鱼'], see: '83', title: '有些路，我只想和你一起走!', lastUpdate:'2019年7月10日', content:'我们这一生会遇到很多人，有的人教你成熟，有的人教你独立。 无论是遇到让你在我们这一生会遇到很多人，有的人教你成熟，有的人教你独立。 无论是遇到让你在' },
          { url: banner02, category: ['Vue','Vuex'], see: '20', title: 'Vuex实现数据状态管理！', lastUpdate:'2019年10月12日', content:'Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。' },
          { url: banner03, category: ['Webhooks','部署'], see: '56', title: 'webhooks实现自动部署!', lastUpdate:'2019年9月22日', content:'Webhooks允许在发生特定事件时通知外部服务。 当指定的事件发生时，我们将向您提供的每个URL发送POST请求。通过这个post请求，我们就能实现自动拉取仓库中的代码，更新到本地，最终实现自动化更新。' },
          { url: banner04, category: ['JavaScript'], see: '42', title: 'JS实现倒计时!', lastUpdate:'2019年8月30日', content:'倒计时业务需求广泛，特别在电商网站中使用较多，用来对于商品的倒计时优惠及抢购，我们这里以倒计时欠费通知为业务背景，做一个到期前七天提醒及到期后禁止使用的倒计时。为保证时间的正确性需要后台返回服务器当前时间，及活动结束时间。' },
          { url: banner05, category: ['杂谈','咸鱼'], see: '83', title: '为什么一个人的时候容易异想天开？', lastUpdate:'2019年7月10日', content:'每个人都有自己固有的思想，对工作的、对生活的、对爱情的以及对周围事物的。然而都没有在一个人放空大脑的时候想的彻底，想的天马行空。其实每个人都有自己心底最深的一滩水，纵然外表光鲜、情绪波动。' },

          { url: banner01, category: ['杂谈','咸鱼'], see: '83', title: '有些路，我只想和你一起走!', lastUpdate:'2019年7月10日', content:'我们这一生会遇到很多人，有的人教你成熟，有的人教你独立。 无论是遇到让你在我们这一生会遇到很多人，有的人教你成熟，有的人教你独立。 无论是遇到让你在' },
          { url: banner02, category: ['Vue','Vuex'], see: '20', title: 'Vuex实现数据状态管理！', lastUpdate:'2019年10月12日', content:'Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。' },
          { url: banner03, category: ['Webhooks','部署'], see: '56', title: 'webhooks实现自动部署!', lastUpdate:'2019年9月22日', content:'Webhooks允许在发生特定事件时通知外部服务。 当指定的事件发生时，我们将向您提供的每个URL发送POST请求。通过这个post请求，我们就能实现自动拉取仓库中的代码，更新到本地，最终实现自动化更新。' },
          { url: banner04, category: ['JavaScript'], see: '42', title: 'JS实现倒计时!', lastUpdate:'2019年8月30日', content:'倒计时业务需求广泛，特别在电商网站中使用较多，用来对于商品的倒计时优惠及抢购，我们这里以倒计时欠费通知为业务背景，做一个到期前七天提醒及到期后禁止使用的倒计时。为保证时间的正确性需要后台返回服务器当前时间，及活动结束时间。' },
          { url: banner05, category: ['杂谈','咸鱼'], see: '83', title: '为什么一个人的时候容易异想天开？', lastUpdate:'2019年7月10日', content:'每个人都有自己固有的思想，对工作的、对生活的、对爱情的以及对周围事物的。然而都没有在一个人放空大脑的时候想的彻底，想的天马行空。其实每个人都有自己心底最深的一滩水，纵然外表光鲜、情绪波动。' },
        ],
        screenWidth: 0,
        animate: false,
        timer: {}
      }
    },
    computed: {
      ...mapState({
        isShowImg: state => state.common.isShowImg
      })
    },
    created() {
    },
    mounted() {
      // 暂时只用屏幕宽度判断，后面可能会做平板适应750-1300
      if (document.body.clientWidth > 750) {
        this.bannerInfo.push(this.bannerInfo[0])
        this.bannerInfo.unshift(this.bannerInfo[this.bannerInfo.length-2])
        this.setWidthBanner()
        // window.addEventListener('resize', this.setWidthBanner())
        this.initAnimate();
      }
    },
    methods: {
      initAnimate(){
        let interval = ()=>{
          this.animate = true;
          // this.bannerInfo.push(this.bannerInfo[0])
          // this.bannerInfo.shift();
          let index = this.slideIndex + 1;
          if(index >= this.bannerInfo.length -2) {
            index = 0;
            // this.animate = false;
          }
          this.handleSlide(index);
        };
        this.timer = null;
        this.timer = setInterval(interval,3000);
        document.querySelector('.carousel').onmouseover  = ()=>{
          clearInterval(timer);
        };
        document.querySelector('.carousel').onmouseout  = ()=>{
          timer = setInterval(interval,3000);
        };
      },
      handleSlide(index){
        this.slideIndex = index;
        let box = document.querySelector('.carousel-inner')
        let initLeft = (this.screenWidth*0.5+20)*0.5
        let leftMove = initLeft + this.screenWidth*0.5*index
        box.style.webkitTransform = 'translateX(' + -leftMove + 'px)';
      },
      goCardDetail(val){
        if(val == '基础理论'){
          // this.$router.push('/basicTheory')
        }else if(val == '深入技术'){
          // this.$router.push('/depthTechnical')
        }else{
          // this.$router.push('/frameworkUsing')
        }
      },
      setWidthBanner() {
        Array.from(document.querySelector('.carousel-inner').children).forEach(function(item){
          item.style.width = window.innerWidth*0.5 + 'px';
        })
        document.querySelector('.carousel-inner').style.webkitTransform = 'translateX(' + -(window.innerWidth*0.5+20)*0.5 + 'px)';
        this.screenWidth = window.innerWidth
      }
    },
    destroyed() {
      // window.removeEventListener('resize', this.setWidthBanner())
      clearInterval(this.timer)
    }
  }
</script>
<style lang="scss">
@import '~/assets/scss/pc/home.scss';
</style>