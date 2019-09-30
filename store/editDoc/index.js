import actions from './actions.js'
import mutations from './mutations.js'

const state = () => {
  return {
    editForm: {
      title: '',
      category: '',
      category_id: '',
      random_color: '',
      imgUrl: '',
      summary: '',
      content: '',
      mdContent: '',
      id: ''
    },
    resetEditForm: {
      title: '',
      category: '',
      category_id: '',
      random_color: '',
      imgUrl: '',
      summary: '',
      content: '',
      mdContent: '',
      id: ''
    },
    loading: false,
    articleDetaile: {},
    upimgFilesUrl: '',
    pageTotal: 0,
    pageUpDown: [],
    submitLoading: false
  }
}

export default {
	namespaced: true,
  state,
  actions,
  mutations
}
