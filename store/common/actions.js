import { getIndexBg, getBaiDuTongJi, modifyCategory, category } from '../../lib/api'
import { Notification } from 'element-ui'
export default {
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
  // 新增修改分类
  async modifyCategoryA ({state, commit, dispatch}, params) {
    let res = await modifyCategory(state.editCategoryForm)
    if (res.flag) {
      Notification({ title: '提示', message: '操作成功！', type: 'success' })
      dispatch('categoryA')
    } else {
      Notification({ title: '提示', message: res.msg, type: 'success' })
    }
  },
  // 查询分类
  async categoryA ({state, commit, dispatch}, params) {
    let res = await category()
    if (res.flag) {
      commit('categoryM', res)
    }
  }
}
