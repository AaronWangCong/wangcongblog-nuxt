export default {
  install: function(Vue, options){
    Vue.prototype.baseDomain = (() =>{
      var baseDomain;
      if(process.env.NODE_ENV == 'product') {
        return baseDomain = "http://www.sendatek.com/"
      }else{
        return baseDomain = "http://home.sendatek.com:3006/"
      }
    })()
  }
}