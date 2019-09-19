import actions from './actions.js';
import mutations from './mutations.js';

const state = () => {
  return {
    isShowImg: false,
    indexBg: '',
    baiduForm: {
      "site_id": "12847821",
      "method": "overview/getTimeTrendRpt",
      "start_date": "20181128",
      "end_date": "20251212",
      "metrics": "pv_count,visitor_count,ip_count,avg_visit_time",
      "gran": "day",
      "max_results": "0"
    }
  }
}

export default {
	namespaced: true,
  state,
  actions,
  mutations
}
