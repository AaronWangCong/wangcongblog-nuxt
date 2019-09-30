export default {
  getIndexBg(state, data) {
    state.indexBg = data
  },
  categoryM (state, data) {
    state.categoryList = data.rows
  },
  articleImgM (state, data) {
    state.articleImgList = data.rows
  }
}