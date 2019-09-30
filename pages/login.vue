<template>
  <div class="login-wrap">
    <div class="login-wrap-content">
      <div class="w">
        <div class="content-text">
          <p>AWC网站后台管理中心</p>
          <p>创造你，就创造了这个世界！</p>
        </div>
        <div class="content-form">
          <el-form ref="loginForm" :model="loginForm" class="demo-ruleForm">
            <el-form-item :rules="[{ required: true, message: '字段不能为空', trigger: 'blur'}]" prop="username" required>
              <el-input v-model="loginForm.username" type="text" autocomplete="off" placeholder="username"></el-input>
            </el-form-item>

            <el-form-item :rules="[{ required: true, message: '字段不能为空', trigger: 'blur'}]" prop="password" required class="password">
              <el-input v-model="loginForm.password" :type="inputType" autocomplete="off" placeholder="password"></el-input>
              <i :class="classeye" class="eyeclose iconfont" @click="handleIconClick"></i>
            </el-form-item>

            <!-- <el-form-item prop="captcha" required class="captcha" :rules="[{ required: true, message: '字段不能为空', trigger: 'blur'}]">
              <el-input type="text" v-model="loginForm.captcha" autocomplete="off" :placeholder="$t('common.captcha')" @keyup.enter.native="submitForm('loginForm')"></el-input>
              <span @click="randomChange()"><img :src="'/api/subject/captcha?random=' + random" alt=""></span>
            </el-form-item> -->

            <el-form-item class="login-btn">
              <el-button :loading="loginLoading" type="danger" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>

            <el-form-item class="forget-psd">
              <span>我是游客？</span>
              <nuxt-link to="/"><i class="iconfont iconzhuye"></i>返回首页</nuxt-link>
              <nuxt-link to="/home"><i class="iconfont iconzhuye"></i>返回博客</nuxt-link>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p>AWC Licensed | 版权所有 © 2019  Power by 汪聪</p>
      <p>Copyright © 2019-present AaronWangCong <a href="http://beian.miit.gov.cn" target="_blank">鄂ICP备18027009号-1</a></p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "",
  components: {},
  props: {},
  layout: "docLayout",
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '654321'
      },
      random: 12345,
      openFlag: false, // 用户密码是否可见，默认不可见
      inputType: "password",
      classeye: "iconeyeoclose"
    };
  },
  computed: {
    ...mapState({
      // loginForm: state => state.login.loginForm,
      loginLoading: state => state.login.loginLoading
    })
  },
  created () {
  },
  mounted () {
  },
  methods: {
    ...mapActions('login', ['loginA']),
    // 密码可见切换
    handleIconClick (ev) {
      this.openFlag = !this.openFlag
      if (this.openFlag) {
        this.inputType = "text"
        this.classeye = "el-icon-view"
      } else {
        this.inputType = "password"
        this.classeye = "iconeyeoclose"
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginA({obj: this.loginForm, router:this.$router})
        } else {
          console.log("error submit!!")
          return false
        }
      });
    },
    randomChange () {
      this.random += 1
    }
  }
};
</script>
<style lang="scss">
.login-wrap {
  background: url("../assets/images/login_bg.jpg") no-repeat center;
  position: fixed;
  width:100%;
  height:100%;
  background-size: cover;
  .login-wrap-content {
    .w {
      height: 800px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media screen and (min-width: 1500px) {
        height: 925px;
      }
      .content-text {
        width: 600px;
        font-size: 36px;
        font-family: GeometrixBlack;
        color: #fff;
        font-weight: 600;
        p{
          line-height: 45px;
        }
      }
      .content-form {
        width: 400px;
        // height: 300px;
        background-color: #fff;
        box-shadow: 0px 3px 21px 0px rgba(0, 0, 0, 0.21);
        border-radius: 4px;
        padding: 40px 50px 0;
        .password {
          .el-form-item__content {
            position: relative;
            i {
              position: absolute;
              font-size: 20px;
              right: 10px;
              top: 0;
              cursor: pointer;
              line-height: 40px;
            }
          }
        }
        .captcha {
          .el-form-item__content {
            display: flex;
            align-items: center;
            &>span{
              width: 150px;
              height: 34px;
              margin-left: 10px;
              display: flex;
              align-items: center;
              img{
                width: 150px;
                height: 34px;
              }
            }
          }
        }
        .login-btn {
          .el-button {
            width: 100%;
          }
        }
        .forget-psd {
          .el-form-item__content {
            display: flex;
            justify-content: space-between;
            color: #999;
            a {
              font-size: 14px;
              color: #999;
              text-decoration: underline;
              &:hover {
                opacity: 0.8;
              }
            }
          }
        }
      }
    }
  }
  .copyright{
    text-align: center;
    color: #fff;
  }
}
</style>