import actions from './actions.js';
import mutations from './mutations.js';

const state = {
  isShowImg: false
}

export default {
	namespaced: true,
  state,
  actions,
  mutations
}
