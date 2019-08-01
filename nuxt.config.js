
export default {
  mode: 'universal',
  head: {
    title: 'WCA-创造你就创造了这个世界！',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: 'WCA,WCA汪聪,WCA技术博文,Aaron,AaronWangCong,wangcong,前端汪聪,vue,nuxt,node,ngnix,pm2' },
      { hid: 'description', name: 'description', content: 'WCA技术博文是汪聪个人门户网站的一个独立子站，包括html、CSS、vue、nuxt、javascript、小程序、pm2等技术知识，致力于开源一份简洁标准的前端技术博文网站。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.jpg' },
      { rel: 'stylesheet', type: 'text/css', href: 'http://at.alicdn.com/t/font_956898_azs7gr7as76.css' },
    ],
    script: [
      { src: 'http://res.wx.qq.com/open/js/jweixin-1.1.0.js'},
      { src:'//code.tidio.co/irncccg0ddbkejvx8en2lvgwcuebnssz.js', type: 'text/javascript', charset: 'utf-8'},
      { src: './pubu/pixi.min.js'},
      { src: './pubu/tinycolor.min.js'},
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  loading: { color: '#fff' },
  css: [
    'ant-design-vue/dist/antd.css'
  ],
  plugins: [
    '@/plugins/antd-ui',
    {src: "@/plugins/skPlayer", ssr: false }
  ],
  modules: [
  ],
  build: {
    extractCSS: { allChunks: true },
    extend(config, ctx) {
    }
  }
}
