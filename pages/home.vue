<template>
  <div class="home-wrap">
    <div class="home-wrap-banner">
      <!-- 移动端显示 -->
      <a-carousel class="m-carousel" autoplay>
        <!-- <div v-for="(item,index) in bannerInfo" :key="index" :style="item.background" class="m-carousel-item"><h2>{{ item.h2 }}</h2></div> -->
      </a-carousel>

      <!-- pc及平板显示 -->
      <message-banner></message-banner>
    </div>

    <div class="home-wrap-slogan">
      <div class="w">
        <div class="blue"><i class="iconfont icon-huati"></i> 通知</div>
          <message-carousel v-if="noticeMessigeInfo.dataList && noticeMessigeInfo.dataList.length" :data-list="noticeMessigeInfo.dataList">
            <template slot-scope="{ row }">
              <nuxt-link :to="{ path: '/home',params: { id: 1 } }" :style="'color:' + row.random_color" tag="div" class="message-box ellipsis">
                <span class="message-date">{{ row.create_time }}</span>&nbsp;&nbsp;&nbsp;&nbsp;{{ row.msg }}
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

    <div class="home-wrap-categoryLabel">
      <div class="w">
        <h2 class="part-title">文章分类</h2>
        <div class="categoryLabel-box">
          <span v-for="(item, index) in categoryList" :key="index" :style="'color:' + item.random_color + ';border-color:' + item.random_color + ';'" @mouseover="categorymouseover" @mouseout="categorymouseout">{{ item.category_name }}</span>
        </div>
      </div>
    </div>

    <div class="home-wrap-card">
      <div class="w">
        <h2 class="part-title">最新文章</h2>
        <div class="card-item-box">
          <div v-for="(item, index) in articleListInfo" :key="index" class="card-item">
            <nuxt-link :to="{path: '/docDetaile/' + item.title, query:{id: item.id, category: item.category}}" target="_blank">
              <article>
                <div :class="isShowImg ? 'lazyloaded' : ''" class="article-img"><img v-lazy="item.imgUrl" alt=""></div>
                <div class="article-text">
                  <div class="article-text-photo"><span><img src="../assets/images/photo.jpg" alt=""></span></div>
                  <!-- <div class="article-text-tag"><span v-for="label in item.category" :key="label">{{ label }}</span></div> -->
                  <div class="article-text-tag">
                    <span :style="'background:' + item.random_color + ';'" class="tag-cel"></span>
                    <span :style="'color:' + item.random_color + ';'" class="tag-text">{{ item.category }}</span>
                    <nuxt-link v-if="auth" :to="{path: '/editDoc', query:{id:item.id} }"><i class="el-icon-edit"></i></nuxt-link>
                    <a><i v-if="auth" class="el-icon-delete" @click="delDoc(item)"></i></a>
                  </div>
                  <div class="article-text-title">{{ item.title }}</div>
                  <div class="article-text-content">{{ item.summary }}</div>
                  <div class="article-text-footer">
                    <span class="last-update">{{ item.create_time }}</span>
                    <span class="see-time"><i class="iconfont icon-liulan"></i> 999</span>
                  </div>
                </div>
              </article>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <!-- <Button action = "{ "type":"adButton","name":"广告位点击" }">广告位图片</Button> -->
  </div>
</template>
<script>
  import banner01 from '../assets/images/banner/banner01.jpg'
  import banner02 from '../assets/images/banner/banner02.jpg'
  import banner03 from '../assets/images/banner/banner03.jpg'
  import banner04 from '../assets/images/banner/banner04.jpg'
  import banner05 from '../assets/images/banner/banner05.jpg'
  import AutoCarousel from '~/components/autoCarousel.vue'
  import MessageBanner from '~/components/autoBanner.vue'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: '',
    components: {
      'message-carousel': AutoCarousel,
      'message-banner': MessageBanner
    },
    props:{
    },
    layout:'blogLayout',
    data() {
      return {
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
        ]
      }
    },
    computed: {
      ...mapState({
        isShowImg: state => state.common.isShowImg,
        categoryList: state => state.common.categoryList,

        auth: state => state.login.auth,

        noticeMessigeInfo: state => state.home.noticeMessigeInfo,
        articleListInfo: state => state.home.articleListInfo,
        articleLoading: state => state.home.articleLoading,
        searchForm: state => state.home.searchForm
      })
    },
    created() {
      // this.noticeMessigeA()
      this.articleListA()
      // this.categoryA()
    },
    mounted() {},
    methods: {
      // ...mapActions('common', ['categoryA']),
      ...mapActions('home', ['noticeMessigeA','articleListA', 'removeDocA']),


      goCardDetail(val){
        if(val == '基础理论'){
          // this.$router.push('/basicTheory')
        }else if(val == '深入技术'){
          // this.$router.push('/depthTechnical')
        }else{
          // this.$router.push('/frameworkUsing')
        }
      },
      delDoc (item) {
        this.$confirm('将删除此文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          alert(1111)
          this.removeDocA({id:item.id})
        }).catch(() => {
        });
      },
      categorymouseover (e) {
        e.target.style.backgroundColor = e.target.style.borderColor
      },
      categorymouseout (e) {
        e.target.style.backgroundColor = '#fff'
        e.target.style.color = e.target.style.borderColor
      }
    }
  }
</script>
<style lang="scss">
@import '~/assets/scss/pc/home.scss';
</style>