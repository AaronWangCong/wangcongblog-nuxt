import actions from './actions.js';
import mutations from './mutations.js';

const state = () => {
  return {
    isShowImg: false,
    indexBg: ''
  }
}

export default {
	namespaced: true,
  state,
  actions,
  mutations
}
