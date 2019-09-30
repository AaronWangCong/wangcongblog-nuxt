import actions from './actions.js'
import mutations from './mutations.js'

const state = () => {
  return {
    noticeMessigeInfo: [],
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
  }
}

export default {
	namespaced: true,
  state,
  actions,
  mutations
}
