<template>
  <div :class="headerHide ? 'hide' : ''" class="header-wrap">
    <div class="w">
      <div class="header-logo">
        <nuxt-link to="/">
          <img src="../assets/images/logo05.png" alt="">
        </nuxt-link>
      </div>
      <ul class="header-nav">
        <nuxt-link to="/" tag="li"><span>引导页</span></nuxt-link>
        <nuxt-link to="/home" tag="li"><span>首页</span></nuxt-link>
        <li><span><a href="http://doc.wangcong.wang/" target="_blank">技术分享</a></span></li>
        <nuxt-link to="/blog" tag="li">
          <span>生活趣事</span> <i class="iconfont icon-xiabiao"></i>
          <ul class="nav-child">
            <nuxt-link to="/blog" tag="li">体验你的我的</nuxt-link>
            <nuxt-link to="/blog" tag="li">孩子呀</nuxt-link>
          </ul>
        </nuxt-link>
        <nuxt-link to="/blog" tag="li"><span>随笔感悟</span></nuxt-link>
        <nuxt-link to="/blog" tag="li"><span>作品介绍</span></nuxt-link>
        <nuxt-link to="/blog" tag="li">
          <span>友情链接</span> <i class="iconfont icon-xiabiao"></i>
          <ul class="nav-child">
            <nuxt-link to="/blog" tag="li"><span>我不是汪聪呀</span></nuxt-link>
            <nuxt-link to="/blog" tag="li"><span>我就是汪聪</span></nuxt-link>
            <nuxt-link to="/blog" tag="li"><span>我才是汪聪啊</span></nuxt-link>
          </ul>
        </nuxt-link>
      </ul>
      <div class="haeder-login">
        <span v-if="auth">欢迎您， <span class="blue">{{ userInfo.nick_name }}</span> !</span>
        <nuxt-link v-else to="/login"><span class="login-btn"><i class="iconfont icon-yinzhang"></i> 登录</span></nuxt-link>
        <span class="login-weixin"><i class="iconfont icon-weixin"></i></span>
        <div v-if="auth" class="login-box">
          <img src="../assets/images/photo.jpg" alt=""> 
          <i class="iconfont icon-xiabiao"></i>
          <ul>
            <li><nuxt-link to="/editDoc" target="_blank"><i class="el-icon-position"></i> 写文章</nuxt-link></li>
            <li @click="logout()"><i class="el-icon-position"></i> 退出</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: '',
    components: {
    },
    props:{
    },
    layout:'',
    data() {
      return {
        headerHide: false
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.login.userInfo,
        auth: state => state.login.auth
      })
    },
    created() {
      this.getUserInfo()
    },
    mounted() {
      document.addEventListener('DOMMouseScroll', this.scrollFunc, false)
      window.onmousewheel = document.onmousewheel = this.scrollFunc
    },
    methods: {
      ...mapActions('login', ['getUserInfo', 'logout']),
      scrollFunc (e) {
        e = e || window.event
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
          if (e.wheelDelta > 0) { //当滑轮向上滚动时  
            // console.log("滑轮向上滚动");
            this.headerHide = false
          }  
          if (e.wheelDelta < 0) { //当滑轮向下滚动时  
            // console.log("滑轮向下滚动");
            this.headerHide = true
          }
        } else if (e.detail) {  //Firefox滑轮事件  
          if (e.detail> 0) { //当滑轮向上滚动时  
            // console.log("滑轮向上滚动");
            this.headerHide = false
          }
          if (e.detail< 0) { //当滑轮向下滚动时  
            // console.log("滑轮向下滚动");
            this.headerHide = true
          }
        }
      }
    },
  }
</script>
<style lang="scss">
.header-wrap{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 998;
  backface-visibility: hidden;
  transition: background-color 0.5s cubic-bezier(0.77,0,0.175,1),box-shadow 0.5s cubic-bezier(0.77,0,0.175,1),transform 0.6s cubic-bezier(0.77,0,0.175,1),-webkit-transform 0.6s cubic-bezier(0.77,0,0.175,1);
  .w{
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-logo{
      width: 160px;
      position: relative;
      img{
        width: 160px;
        // height: 76px;
      }
      &::after{
        content: '';
        width: 1px;
        height: 40px;
        background-color: #dedede;
        position: absolute;
        right: -40px;
        top: 6px;
      }
    }
    .header-nav{
      flex: 1;
      display: flex;
      margin-left: 60px;
      &>li{
        margin: 0 20px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease-in;
        line-height: 80px;
        position: relative;
        &>span{
          transition: all 0.3s ease-in;
          color: #34495e;
          a{
            transition: all 0.3s ease-in;
            color: #34495e;
          }
        }
        i{
          font-size: 12px;
          color: #999;
          font-weight: normal;
        }
        .nav-child{
          position: absolute;
          min-width: 150px;
          padding: 10px 20px;
          background-color: #fff;
          box-shadow: 0 0 30px rgba(0,0,0,0.07);
          top: 100%;
          z-index: 999;
          transition: all 0.5s cubic-bezier(0.77,0,0.175,1);
          opacity: 0;
          transform: translateY(5px);
          visibility: hidden;
          li{
            line-height: 35px;
            transition: all 0.3s ease-in;
            &:hover{
              color: #1890FF;
            }
          }
        }
        &:hover{
          &>span{
            color: #1890FF;
            a{
              color: #1890FF;
            }
          }
          .nav-child{
            transform: translateY(-2px);
            visibility: visible;
            opacity: 1;
          }
        }
      }
    }
    .haeder-login{
      // width: 200px;
      height: 100%;
      display: flex;
      align-items: center;
      .login-btn{
        align-items: center;
        background-color: #ff6a5f;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        font-size: 14px;
        height: 30px;
        justify-content: center;
        transition: background-color 0.5s cubic-bezier(0.77,0,0.175,1),border-color 0.5s cubic-bezier(0.77,0,0.175,1);
        width: 80px;
        margin-right: 10px;
        // background-image: -webkit-linear-gradient(45deg,#2196F3,#03A9F4);
        -webkit-animation: bgcolorRandom 7s infinite linear;
      }
      .login-weixin{
        display: flex;
        align-items: center;
        background-color: #34495e;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        height: 30px;
        margin-left: 15px;
        justify-content: center;
        transition: background-color 0.5s cubic-bezier(0.77,0,0.175,1),border-color 0.5s cubic-bezier(0.77,0,0.175,1);
        width: 30px;
        color: #FFF;
        -webkit-animation: bgcolorRandom 3s infinite linear;
      }
      .login-box {
        position: relative;
        margin-left: 15px;
        height: 100%;
        padding: 22.5px 0;
        &>img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
        }
        &>i{
          cursor: pointer;
        }
        &>ul{
          position: absolute;
          min-width: 120px;
          padding: 10px 20px;
          background-color: #fff;
          box-shadow: 0 0 30px rgba(0,0,0,0.07);
          top: 100%;
          z-index: 999;
          transition: all 0.5s cubic-bezier(0.77,0,0.175,1);
          opacity: 0;
          transform: translate(-20px,10px);
          visibility: hidden;
          border-radius: 5px;
          li{
            line-height: 25px;
          }
        }
        &:hover{
          ul{
            transform: translate(-20px, -2px);
            visibility: visible;
            opacity: 1;
            li{
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  &.hide{
    box-shadow: none;
    -webkit-transform: translateY(-80px);
    transform: translateY(-80px);
  }
}
</style>
