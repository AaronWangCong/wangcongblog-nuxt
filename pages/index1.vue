<template>
  <div class="">
    <nuxt-link to="/home">home</nuxt-link>
    <nuxt-link to="/blog">blog</nuxt-link>
    <nuxt-link to="/h5c3/pubu">pubu</nuxt-link>

    <!-- 首页通知 -->
    <NoticeMessige />
  </div>
</template>
<script>
  import NoticeMessige from '../components/NoticeMessige.vue'
  export default {
    name: '',
    components: {
      NoticeMessige
    },
    props:{
    },
    layout:'',
    data() {
      return {
      }
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
    },
  }
</script>
<style lang="scss">
</style>