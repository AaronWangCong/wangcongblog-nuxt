<template>
  <!-- pc及平板显示 -->
  <div class="carousel pc-carousel">
    <div class="carousel-inner-view">
      <div :class="{ anim:animate === true }" class="carousel-inner">
        <div v-for="(item,index) in bannerInfo" :key="index" :style="item.background" class="carousel-inner-item">
          <nuxt-link to="/home">
            <div :class="{ on: slideIndex +1 === index }" class="item-text">
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
</template>

<script>
  var timer = null
  import banner01 from '../assets/images/banner/banner01.jpg'
  import banner02 from '../assets/images/banner/banner02.jpg'
  import banner03 from '../assets/images/banner/banner03.jpg'
  import banner04 from '../assets/images/banner/banner04.jpg'
  import banner05 from '../assets/images/banner/banner05.jpg'
  import { mapState } from 'vuex'
  export default {
    props: {},
    data() {
      return {
        bannerInfo: [
          { h2: '1',background: 'background: url(' + banner01 + ') no-repeat;', url: banner01, category: ['Vue','Vuex'], see: '20', title: 'Vuex实现数据状态管理！', lastUpdate:'2019年10月12日', content:'Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。' },
          { h2: '2',background: 'background: url(' + banner02 + ') no-repeat;', url: banner02, category: ['Webhooks','部署'], see: '56', title: 'webhooks实现自动部署!', lastUpdate:'2019年9月22日', content:'Webhooks允许在发生特定事件时通知外部服务。 当指定的事件发生时，我们将向您提供的每个URL发送POST请求。通过这个post请求，我们就能实现自动拉取仓库中的代码，更新到本地，最终实现自动化更新。' },
          { h2: '3',background: 'background: url(' + banner03 + ') no-repeat;', url: banner03, category: ['JavaScript'], see: '42', title: 'JS实现倒计时!', lastUpdate:'2019年8月30日', content:'倒计时业务需求广泛，特别在电商网站中使用较多，用来对于商品的倒计时优惠及抢购，我们这里以倒计时欠费通知为业务背景，做一个到期前七天提醒及到期后禁止使用的倒计时。为保证时间的正确性需要后台返回服务器当前时间，及活动结束时间。' },
          { h2: '4',background: 'background: url(' + banner04 + ') no-repeat;', url: banner04, category: ['杂谈','咸鱼'], see: '83', title: '为什么一个人的时候容易异想天开？', lastUpdate:'2019年7月10日', content:'每个人都有自己固有的思想，对工作的、对生活的、对爱情的以及对周围事物的。然而都没有在一个人放空大脑的时候想的彻底，想的天马行空。其实每个人都有自己心底最深的一滩水，纵然外表光鲜、情绪波动。' },
        ],
        slideIndex: 0,
        screenWidth: 0,
        animate: true
      }
    },
    mounted(){
      // 暂时只用屏幕宽度判断，后面可能会做平板适应750-1300
      if (document.body.clientWidth > 750) {
        this.bannerInfo.push(this.bannerInfo[0])
        this.bannerInfo.unshift(this.bannerInfo[this.bannerInfo.length-2])
        this.setWidthBanner()
        this.initAnimate()
      }
    },
    destroyed(){
      clearInterval(timer)
    },
    methods: {
      scroll(){
        this.animate = true                     // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(()=>{
          let index = this.slideIndex + 1
          if(index >= this.bannerInfo.length -2) {
            index = 0
            // this.animate = false
          }
          this.handleSlide(index)
        },500)
      },
      initAnimate(){
        clearInterval(timer)
        timer = setInterval(this.scroll,3000)
        document.querySelector('.carousel').onmouseover  = ()=>{
          clearInterval(timer)
        }
        document.querySelector('.carousel').onmouseout  = ()=>{
          timer = setInterval(this.scroll,3000)
        }
      },
      handleSlide(index){
        this.slideIndex = index
        let box = document.querySelector('.carousel-inner')
        let initLeft = (this.screenWidth*0.5+20)*0.5
        let leftMove = initLeft + this.screenWidth*0.5*index
        box.style.webkitTransform = 'translateX(' + -leftMove + 'px)'
      },
      setWidthBanner() {
        Array.from(document.querySelector('.carousel-inner').children).forEach(function(item){
          item.style.width = window.innerWidth*0.5 + 'px'
        })
        document.querySelector('.carousel-inner').style.webkitTransform = 'translateX(' + -(window.innerWidth*0.5+20)*0.5 + 'px)'
        this.screenWidth = window.innerWidth
      }
    },
    beforeRouteLeave(form,to,next){
      clearInterval(timer)
      next()
    }
  }
</script>

<style lang="scss">
  .carousel {
    color: #fff;
    .carousel-inner-view{
      width: 100%;
      position: relative;
      overflow: hidden;
      height: 500px;
      .carousel-inner {
        position: absolute;
        white-space: nowrap;
        display: flex;
        &.anim{
          transition: all 0.3s ease-in;
        }
        &>div{
          width: 720px;
          height: 500px;
          margin-right: 20px;
          background-position: center;
          background-size: cover;
          .item-text{
            width: 50%;
            height: 100%;
            max-width: 300px;
            padding: 60px 20px 30px;
            background: rgba(31,43,56,0.6);
            opacity: 0;
            transition: all 1s cubic-bezier(0.77,0,0.175,1);
            &.on{
              opacity: 1;
            }
            header{
              p{
                display: flex;
                align-items: center;
                &>span{
                  color: #fff;
                  display: flex;
                  align-items: center;
                  margin-right: 20px;
                  img{
                    border-radius: 50%;
                    height: 20px;
                    margin-right: 8px;
                    width: 20px;
                  }
                  span{
                    font-size: 14px;
                    color: #fff;
                    position: relative;
                    padding: 0 10px;
                    background: #fd721f;
                    margin-right: 10px;
                    border-radius: 5px;
                    // &::before{
                    //   content: '';
                    //   width: 6px;
                    //   height: 6px;
                    //   border-radius: 50%;
                    //   background: #fd721f;
                    //   position: absolute;
                    //   left: 0;
                    //   top: 8px;
                    // }
                    &:nth-of-type(2){
                      background: #4CAF50;
                    }
                    &:nth-of-type(3){
                      background: rgb(205, 77, 209);
                    }
                  }
                }
              }
              h2{
                font-size: 15px;
                font-weight: 600;
                letter-spacing: -0.2px;
                margin-bottom: 0;
                color: #fff;
              }
            }
            .item-text-content{
              color: #fff;
              margin-top: 30px;
              -webkit-line-clamp: 5;
              font-size: 13px;
              -webkit-box-orient: vertical;
              white-space: normal;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              margin-bottom: 10px;
              line-height: 25px;
            }
            .item-text-footer{
              display: flex;
              &>span{
                color: #34495e;
                position: relative;
                margin-right: 5px;
                padding: 4px 6px;
                border-radius: 4px;
                font-weight: 500;
                background: rgb(246,246,246);
                font-size: 12px;
                height: 20px;
                display: flex;
                align-items: center;
              }
            }
          }
        }
      }
    }
    .carousel-control {
      display: flex;
      justify-content: center;
      bottom: 30px;
      left: 0;
      right: 0;
      li {
        width: 40px;
        height: 30px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        span {
          flex: 1;
          height: 4px;
          background: #ccc;
        }
        &.on span,&:hover span {
          background: #1779c9;
        }
        &~li {
          margin-left: 8px;
        }
      }
    }
  }
</style>
