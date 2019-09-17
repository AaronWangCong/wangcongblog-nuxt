import Monitor from "monitors-js/lib/monitor.js"
import vuePlugin from "monitors-js/lib/vuePlugin.js"
import Vue from 'vue'
var monitor = new Monitor({
  itemID: 'asdjasdtjk21b3k1j2g3', //唯一的项目Id
  url: '', //若autoPush为true 则自动上报异常 ，跨域需要配置
  autoPush: true, // 是否自动上报异常 ，默认为false
  match: ["localhost"], //需要上报的域名 开发环境下可以不选择上报
  exclude: ['WeixinJSBridge', 'x5onSkinSwitch'], //过滤的错误信息 根据details字段
})
//需要最先声明
monitor
  .addPlugin(vuePlugin) //添加vueError监听 根据errorHandler函数
  .install()
  .on('captureBefore', (data) => {
    //上报异常触发的回调 data 是上报的参数
    console.log(data)
  })
  .on('onPointClick', (data) => {
    // action = '{ "type":"adButton",name:"广告位点击" }'
    console.log(data.value)
    console.log(data)
  })
//设置
monitor.setConfig({
  email: "xx@qq.com",
  userName: "张三"
})
new Vue({
  el: "#id",
  created: function () {
      console.log('c')
      1 / x
  },
  render: function (h) {
      return h('Button', 'click')
  }
})
