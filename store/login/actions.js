import { loginApi, getUserInfoApi, logoutApi } from "../../lib/api";
import { Notification } from 'element-ui'
import Cookies from 'js-cookie'

export default {
  // 登录
  async loginA({ commit,dispatch }, param) {
    let obj = await loginApi(param.obj);
    if (obj.flag) {
      Notification({ title: '提示', message: '登录成功!', type: 'success' });
      Cookies.set("auth", obj.data.token);
      param.router.push('/home')
    } else {
      Notification({ title: '提示', message: obj.flag, type: 'success' });
    }
  },
  //获取用户信息
  async getUserInfo({state, commit}) {
    let loginedtoken = Cookies.get("auth")
    if (loginedtoken) {
      console.log('获取用户信息')
      let obj = await getUserInfoApi()
      if(obj.flag) {
        commit('setUserInfo', obj.data);
        commit('setAuth', loginedtoken);
      } else {
        Notification({ title: '提示', message: '请先登录!', type: 'success' });
      }
    }
  },

  // 登出
  async logout({ commit,dispatch }, $router) {
    let obj = await logoutApi();
    commit('setAuth', null);
    commit('setUserInfo', {});
    Cookies.remove('auth');
    Notification({ title: '提示', message: '退出成功!', type: 'success' });
  }
}