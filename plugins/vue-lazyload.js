import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,//
  error: './photo.jpg',
  loading: './loading.gif',
  attempt: 7,
  listenEvents: [ 'scroll' ],
})