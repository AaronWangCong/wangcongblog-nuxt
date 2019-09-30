import actions from './actions.js';
import mutations from './mutations.js';

const state = () => {
  return {
    auth: null,
    userInfo: {},
    loginLoading: false
  }
}

export default {
	namespaced: true,
  state,
  actions,
  mutations
}
