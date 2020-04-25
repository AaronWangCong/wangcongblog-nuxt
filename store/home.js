import { noticeMessige, articleList, removeDoc, articleDetaile, articleListUpDown } from '../lib/api'

const state = () => ({
  noticeMessigeInfo: {
    dataList: []
  },
  articleListInfo: [],
  articleLoading: false,
  searchForm: {
    keywords: '',
    category: '',
    pagingDto: {
      pageSize: 10,
      pageNo: 1,
      pageTotal: 0
    }
  },


  arricleDetailLoading: false,
  pageUpDown: [],
})

const actions = {
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
  },


  async articleDetaileA ({state, commit, dispatch}, params) {
    commit('cleararticleDetaile')
    commit('changeloading', true)
    let res = await articleDetaile(params);
    if (res) {
      commit('changeloading', false)
      commit('articleDetaileM', res)
    }
  },
  // 查询文章上下篇的id
  async articleListUpDownA ({state, commit, dispatch}, params) {
    let res = await articleListUpDown(params);
    if (res.flag) {
      commit('articleListUpDownm', res)
    }
  }
}

const mutations = {
  noticeMessigeM(state, data) {
    state.noticeMessigeInfo.dataList = data.rows
  },
  articleListM(state, data) {
    state.articleListInfo = data.rows
    state.pageTotal = data.total
  },
  changeArticleLoading (state, data) {
    state.articleLoading = data
  },
  articleListUpDownm (state, data) {
    state.pageUpDown = data.rows
  },
  articleDetaileM(state, data) {
    state.articleDetaile = data.obj
  },
  changeloading(state, data) {
    state.arricleDetailLoading = data
  },
  cleararticleDetaile(state, data) {
    state.articleDetaile = []
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}