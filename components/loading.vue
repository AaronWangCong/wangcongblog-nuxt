<template>
  <div class="loading-wrap">
    <img src="../assets/images/loading.jpg" alt="">
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
.loading-wrap{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>