export default {
  articleDetaileM(state, data) {
    state.articleDetaile = data.obj

    state.editForm.title = state.articleDetaile.title
    state.editForm.id = state.articleDetaile.id
    state.editForm.imgUrl = state.articleDetaile.imgUrl
    state.editForm.category = state.articleDetaile.category
    state.editForm.category_id = state.articleDetaile.category_id
    state.editForm.random_color = state.articleDetaile.random_color
    state.editForm.summary = state.articleDetaile.summary
    state.quillcontent = state.articleDetaile.content
    state.articleDetaile.mdContent ? state.editForm.mdContent = state.articleDetaile.mdContent : state.editForm.mdContent = state.articleDetaile.content
  },
  changeloading(state, data) {
    state.loading = data
  },
  cleararticleDetaile(state, data) {
    state.articleDetaile = []
  },
  upimgFilesM (state, data) {
    state.upimgFilesUrl = data.data.url
  },
  articleListUpDownm (state, data) {
    state.pageUpDown = data.rows
  },
  changeSubmitLoading (state, data) {
    state.submitLoading = data
  },
  articleUpimgFilesM (state, data) {
    state.editForm.imgUrl = data.data.remotefilePath
  },
  clearEditForm (state) {
    Object.assign(state.editForm, state.resetEditForm)
  }
}