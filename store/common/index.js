import actions from './actions.js';
import mutations from './mutations.js';

const state = {
  isShowImg: false,
  indexBg: ''
}

export default {
	namespaced: true,
  state,
  actions,
  mutations
}
