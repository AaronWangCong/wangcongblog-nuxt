import { getIndexBg, getBaiDuTongJi, modifyCategory, category, articleImg } from '../lib/api'

const state = () => ({
  indexBg: '',
  baiduForm: {
    "header": {
      "username": "13997592990",
      "password": "Asd-123..",
      "token": "3f5010a1128abfd1eaa0a9d1ea9a16b9",
      "account_type": "1"
    },
    "body": {
      "site_id": "12835861",
      "method": "source/all/a",
      "start_date": "20190901",
      "end_date": "20251212",
      "metrics": "pv_count,visit_count,visitor_count,new_visitor_count,ip_count,avg_visit_time",
      "gran": "day",
      "max_results": "0"
    }
  },
})

const actions = {
  async getIndexBgA ({state, commit, dispatch}, params) {
    let res = await getIndexBg()
    if (res) {
      commit('getIndexBg', res)
    }
  },
  async getBaiDuTongJiA ({state, commit, dispatch}, params) {
    let res = await getBaiDuTongJi(state.baiduForm)
    if (res) {
      // commit('getBaiDuTongJiM', res)
    }
  },
}

const mutations = {
  getIndexBg(state, data) {
    state.indexBg = data
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}