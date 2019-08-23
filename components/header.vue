<template>
  <div class="header-wrap">
    <div class="w">
      <div class="header-logo"><nuxt-link to="/"><img src="../assets/images/logo.png" alt=""></nuxt-link></div>
      <ul class="header-nav">
        <nuxt-link to="/" tag="li"><span>欢迎页</span></nuxt-link>
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
            <nuxt-link to="/blog" tag="li">我不是汪聪呀</nuxt-link>
            <nuxt-link to="/blog" tag="li">我就是汪聪</nuxt-link>
            <nuxt-link to="/blog" tag="li">我才是汪聪啊</nuxt-link>
          </ul>
        </nuxt-link>
        <nuxt-link to="/blog" tag="li">
          <span>造梦者</span> <i class="iconfont icon-xiabiao"></i>
          <ul class="nav-child">
            <nuxt-link to="/blog" tag="li">造梦师</nuxt-link>
          </ul>
        </nuxt-link>
      </ul>
      <div class="haeder-login">
        <span class="login-btn"><i class="iconfont icon-yinzhang"></i> 登录</span>
        <span class="login-weixin"><i class="iconfont icon-weixin"></i></span>
        <span class="login-weixin"><i class="iconfont icon-tuite"></i></span>
      </div>
    </div>
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
      }
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
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
  z-index: 1001;
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
        height: 40px;
      }
      &::after{
        content: '';
        width: 1px;
        height: 40px;
        background-color: #dedede;
        position: absolute;
        right: -40px;
        top: 0px;
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
          z-index: 1002;
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
      width: 200px;
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
    }
  }

  @media screen and (max-width: 750px) {
    box-shadow: 0 0.02rem 0.12rem 0 rgba(0, 0, 0, 0.1);
    .w{
      height: 1rem;
      padding: 0 0.4rem;
      .header-logo{
        width: 1.6rem;
        img{
          width: 2rem;
          height: 0.5rem;
        }
        &::after{
          width: 0.01rem;
          height: 0.4rem;
          right: -0.4rem;
        }
      }
      .header-nav{
        display: none;
      }
      .haeder-login{
        width: 2rem;
        span{
          font-size: 0.16rem;
        }
      }
    }
  }
}
</style>