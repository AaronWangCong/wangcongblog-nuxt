<template>
  <div class="docDetail-wrap">
    
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: '',
    components: {
    },
    filters: {
      dateTimeExist(val){
        if (!val) return
        return val.slice(0, 10) + ' ' + val.slice(11, 19)
      }
    },
    props:{
    },
    layout:'blogLayout',
    data() {
      return {
      }
    },
    computed: {
      ...mapState({
        articleDetaile: state => state.home.articleDetaile,
        arricleDetailLoading: state => state.home.arricleDetailLoading,
        articleListInfo: state => state.home.articleListInfo,
        searchForm: state => state.home.searchForm,
        pageUpDown: state => state.home.pageUpDown
      })
    },
    created() {
      this.searchForm.category = this.$route.query.category
      this.articleListA()
      this.articleDetaileA({id: this.$route.query.id})
      this.articleListUpDownA({id: this.$route.query.id})
    },
    mounted() {
    },
    methods: {
      ...mapActions('home',['articleDetaileA', 'articleListA', 'articleListUpDownA'])
    },
  }
</script>
<style lang="scss">
.docDetail-wrap{

}
</style>