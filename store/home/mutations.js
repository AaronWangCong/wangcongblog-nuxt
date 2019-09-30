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
}