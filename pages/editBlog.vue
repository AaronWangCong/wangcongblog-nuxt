<template>
  <div class="editBlog">
    <no-ssr>
      <mavon-editor 
        v-model="content" 
        ref="md" 
        @change="change" 
        @imgAdd="$imgAdd"
        style="min-height: 600px"
      />
    </no-ssr>

    <button @click="submit">提交</button>
  </div>
</template>
<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: '',
    components: {
      mavonEditor
    },
    props:{
    },
    layout:'',
    data() {
      return {
        content:'', // 输入的markdown
        html:'',    // 及时转的html
      }
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
      // 将图片上传到服务器，返回地址替换到md中
      $imgAdd(pos, $file){
        let formdata = new FormData();
        console.log('formdata', formdata, $file)
        // this.$upload.post('/上传接口地址', formdata).then(res => {
        //     console.log(res.data);
        //     this.$refs.md.$img2Url(pos, res.data);
        // }).catch(err => {
        //     console.log(err)
        // })
      },
      change(value, render){
        // render 为 markdown 解析后的结果[html]
        this.html = render;
      },
      // 提交
      submit(){
        console.log(this.content);
        console.log(this.html);
      }
    },
  }
</script>
<style lang="scss">
</style>