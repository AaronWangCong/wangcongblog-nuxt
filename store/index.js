import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import common from './common'

const store = () => new Vuex.Store({
  modules: {
      common
  }
})
export default store;