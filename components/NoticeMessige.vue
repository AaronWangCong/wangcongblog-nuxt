<template>
  <div class="">
    <a-modal v-model="visible" :mask-closable="false" :keyboard="false" :closable="false" :footer="null" title="友情提示">
      <p>主站建设中...</p>
      <p>技术博客请访问子站<a href="http://doc.wangcong.wang" target="_blank">http://doc.wangcong.wang</a></p>
    </a-modal>
  </div>
</template>
<script>
  export default {
    name: '',
    components: {
    },
    props:{
    },
    layout:'',
    data() {
      return {
        visible: true
      }
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
      handleOk(e) {
        console.log(e)
        this.visible = false
      }
    },
  }
</script>
<style lang="scss">
</style>