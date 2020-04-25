
export default {
  mode: 'universal',
  head: {
    title: 'AWC汪聪-创造你就创造了这个世界！',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: 'AWC汪聪,AWC技术博文,Aaron,AaronWangCong,wangcong,前端汪聪,vue,nuxt,node,ngnix,pm2,服务端渲染' },
      { hid: 'description', name: 'description', content: 'AWC汪聪是汪聪个人门户网站的主站，包括html、CSS、vue、nuxt、javascript、小程序、pm2等技术知识，致力于打造一份符合自己编码风格的独立站点。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.jpg' },
      { rel: 'stylesheet', type: 'text/css', href: 'http://at.alicdn.com/t/font_956898_dmazn3p75bp.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.bootcss.com/animate.css/3.7.0/animate.min.css' },
    ],
    script: [
      { src: 'http://res.wx.qq.com/open/js/jweixin-1.1.0.js'},
      { src:'//code.tidio.co/irncccg0ddbkejvx8en2lvgwcuebnssz.js', type: 'text/javascript', charset: 'utf-8'},
      { src: '/js/snow.js'},
      { src: 'https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget/autoload.js'},
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  loading: '@/components/loading.vue',
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'ant-design-vue/dist/antd.css',
    '~assets/scss/reset.scss',
    '~assets/scss/style.scss'
  ],
  plugins: [
    { src: "@/plugins/antd-ui", ssr: true },
    { src: "@/plugins/baidutuisong", ssr: false },
    { src: "@/plugins/baseDomain", ssr: true },
    { src: "@/plugins/vue-lazyload", ssr: false },
  ],
  modules: [
    '@nuxtjs/proxy'
  ],
  proxy: [
    ['/oa', { target: 'http://127.0.0.1:8081/' }],
    // ['/oa', { target: 'http://api.wangcong.wang' }],
    ['/json', { target: 'https://api.baidu.com/'}]
  ],
  build: {
    extractCSS: { allChunks: true },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
}
