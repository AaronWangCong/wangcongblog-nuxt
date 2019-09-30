export default {
  noticeMessigeM(state, data) {
    state.noticeMessigeInfo = data.rows
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