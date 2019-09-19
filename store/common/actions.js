import { getIndexBg, getBaiDuTongJi } from '../../lib/api'
export default {
  async getIndexBgA ({state, commit, dispatch}, params) {
    let res = await getIndexBg();
    if (res) {
      commit('getIndexBg', res)
    }
  },
  async getBaiDuTongJiA ({state, commit, dispatch}, params) {
    let res = await getBaiDuTongJi(state.baiduForm);
    if (res) {
      // commit('getBaiDuTongJiM', res)
    }
  }
}
