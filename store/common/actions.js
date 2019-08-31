import { getIndexBg } from '../../lib/api'
export default {
  async getIndexBgA ({state, commit, dispatch}, params) {
    let res = await getIndexBg();
    if (res) {
      commit('getIndexBg', res)
    }
  }
}
