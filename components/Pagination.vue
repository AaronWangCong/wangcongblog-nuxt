<template>
  <div class="pagination-wrap">
    <!-- <Pagination v-model="searchForm.pagingDto" @onSearch="search"></Pagination> -->
    <!-- searchForm: {
        pagingDto: {
          pageNo: 1,
          pageSize: 10,
          pageTotal: 20
        }
      }, -->
    <el-pagination
      :page-sizes="pageSizes"
      :page-size="pagerData.pageSize"
      :total="pagerData.pageTotal"
      :current-page="pagerData.pageNo"
      layout="total, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'pagerData', // 注意，是prop
    event: 'valueChange'
  },
  props: {
    pagerData: {
      type: Object,
      required: false,
      default: {}
    }
  },
  data () {
    return {
      pageSizes: [10, 20, 30]
    };
  },
  mounted () {
  },
  methods: {
    handleSizeChange (pageSize) {
      this.$emit('valueChange', this.pagerData)
    },
    handleCurrentChange (pageNo) {
      this.pagerData.pageNo = pageNo
      this.$emit('valueChange', this.pagerData)
      this.$emit("onSearch");
    }
  }
};
</script>

<style>
.pagination-wrap {
  margin-top: 20px;
  text-align: right;
}
</style>
