import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import common from './common'
import home from './home'
import login from './login'
import editDoc from './editDoc'

const store = () => new Vuex.Store({
  modules: {
    common,
    home,
    login,
    editDoc
  }
})
export default store