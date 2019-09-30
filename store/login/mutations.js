export default {
    setAuth(state, auth) {
      console.log('设置auth', auth)
      state.auth = auth
    },
    setUserInfo(state, data) {
      state.userInfo = data
    }
}