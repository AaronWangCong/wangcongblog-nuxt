import { noticeMessige, articleList, removeDoc } from '../../lib/api'
import { Notification } from 'element-ui'
export default {
  // 获取消息通知
  async noticeMessigeA ({state, commit, dispatch}, params) {
    let res = await noticeMessige()
    if (res.flag) {
      commit('noticeMessigeM', res)
    }
  },
  // 查询文章列表
  async articleListA ({state, commit, dispatch}, params) {
    commit('changeArticleLoading', true)
    let res = await articleList(state.searchForm);
    if (res.flag) {
      commit('changeArticleLoading', false)
      commit('articleListM', res)
    } else {
      commit('changeArticleLoading', false)
    }
  },
  async removeDocA ({state, commit, dispatch}, params) {
    let res = await removeDoc(params)
    if (res) {
      Notification({ title: '提示', message: '删除成功！', type: 'success' });
      dispatch('articleListA')
    }
  }
}
