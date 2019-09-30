<template>
  <div class="editDoc-wrap">
    <div class="doc-banner">
      <div class="doc-banner-box">
        <h2>AWC文章编辑</h2>
      </div>
    </div>

    <div class="editDoc-form w">
      <div class="editDoc-form-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home' }">博客</el-breadcrumb-item>
          <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="100px" class="demo-editForm">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="editForm.title" placeholder="请输入文章标题" clearable></el-input>
        </el-form-item>

        <el-form-item label="文章分类" prop="category">
          <el-select v-model="editForm.category_id" clearable filterable placeholder="请选择文章分类" @change="categoryChange">
            <el-option v-for="(item, index) in categoryList" :label="item.category_name" :value="item.category_id" :key="index"><p class="flex-btw m0 lineheight34">{{ item.category_name }} <i class="el-icon-edit" @click="editCategory(item)"></i></p></el-option>
          </el-select>
          <el-button type="danger" plain @click="editCategoryDialogVisible = true">新增分类</el-button>
        </el-form-item>

        <el-form-item label="文章摘要" prop="summary">
          <el-input v-model="editForm.summary" placeholder="请输入文章摘要" clearable></el-input>
        </el-form-item>

        <el-form-item label="文章封面" prop="imgUrl" class="articleUpload">
          <el-upload
            :show-file-list="false"
            :http-request="articleUploadChange"
            accept=".jpg,.png,.jpeg,.gif"
            class="articleImg-uploader"
            action="123">
            <img v-if="editForm.imgUrl" :src="editForm.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div><el-button type="danger" plain @click="articleImgDialogVisible = true">从现有封面添加</el-button></div>
        </el-form-item>

        <el-form-item label="文章内容" prop="content">
          <div class="change-edit">
            <el-upload :http-request="mdUploadChange" :show-file-list="false" action="/" class="md-uploader" accept=".md" name="img">
              <el-button type="danger" plain @click="isdefaultEdit = false">上传md</el-button>
            </el-upload>
            <el-button type="danger" @click="isdefaultEdit = false">md编辑器</el-button>
            <el-button type="danger" @click="isdefaultEdit = true">经典编辑器</el-button>
          </div>
          <div v-if="!isdefaultEdit">
            <no-ssr>
              <mavon-editor 
                ref="md"
                v-model="editForm.mdContent"
                :ishljs="true"
                style="max-height: 980px;"
                @change="change" 
                @imgAdd="$imgAdd"
                @imgDel="$imgDel"
              />
            </no-ssr>
          </div>
          <div v-else>
            <!-- 图片上传组件辅助-->
            <el-upload :http-request="uploadChange" :show-file-list="false" :on-error="uploadError" :before-upload="beforeUpload" action="/" class="avatar-uploader" name="img" style="display: none;"></el-upload>
            <no-ssr>
              <quill-editor
                ref="myQuillEditor"
                v-model="quillcontent"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
              </quill-editor>
            </no-ssr>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button :loading="submitLoading" class="save-btn" type="danger" @click="submitForm('editForm')">保存并发布</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 新增修改分类弹窗 -->
    <el-dialog :visible.sync="editCategoryDialogVisible" :before-close="editCategoryDialogClose" :close-on-click-modal="false" title="新增修改分类" width="400px">
      <div class="editCategory">
        <el-form ref="editCategoryForm" :model="editCategoryForm" label-width="100px">
          <el-form-item :rules="{required: true, message: '分类名称不能为空', trigger: 'blur'}" label="文章图片" prop="category_name">
            <el-input v-model="editCategoryForm.category_name" clearable placeholder="请输入分类名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCategoryDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyCategory('editCategoryForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加文章封面 -->
    <el-dialog :visible.sync="articleImgDialogVisible" :close-on-click-modal="false" title="添加文章封面" width="800px">
      <div class="articleImg">
        <div class="articleImg-head"><span :class="articleImgForm.imgtype === 'logo' ? 'on' : ''" @click="changeArticleImg('logo')">文章封面</span><span :class="articleImgForm.imgtype === 'detaile' ? 'on' : ''" @click="changeArticleImg('detaile')">文章详情</span></div>
        <div v-loading="articleImgLoading" class="articleImg-list">
          <span v-for="(item, index) in articleImgList" :key="index" @click="selectArticleImg(item)">
            <img :src="item.imgurl" alt="">
          </span>
        </div>
        <!-- 分页 -->
        <Pagination v-model="articleImgForm.pagingDto" @onSearch="articleImgListSearch()"></Pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="articleImgDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import { mapState, mapActions, mapMutations } from 'vuex'
  import { upimgFiles, recognizeFile } from '../lib/api'
  import Cookies from 'js-cookie'
  import Pagination from "../components/Pagination.vue";
  export default {
    name: '',
    components: {
      mavonEditor,
      Pagination
    },
    props:{
    },
    layout:'blogLayout',
    data() {
      return {
        editFormRules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' }
          ],
          summary: [
            { required: true, message: '请输入文章摘要', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请选择文章分类', trigger: 'change' }
          ],
          imgUrl: [
            { required: true, message: '请上传文章图片', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请选择文章内容', trigger: 'blur' }
          ]
        },
        isdefaultEdit: false,
        quillcontent: ``,
        editorOption: {
          placeholder: '请输入内容',
          theme: 'snow',  // or 'bubble'
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{'header': 1}, {'header': 2}],               // custom button values
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                [{'direction': 'rtl'}],                         // text direction

                [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
                [{'header': [1, 2, 3, 4, 5, 6, false]}],

                [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                [{'font': []}],
                [{'align': []}],
                ['image'],
                ['clean']                                         // remove formatting button
              ],  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector('.avatar-uploader input').click()
                  } else {
                    this.quill.format('image', false)
                  }
                }
              }
            }
          }
        },
        quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
        img_file: [],
        editCategoryDialogVisible: false,
        articleImgDialogVisible: false
      }
    },
    computed: {
      ...mapState({
        articleDetaile: state => state.editDoc.articleDetaile,
        submitLoading: state => state.editDoc.submitLoading,
        articleImg: state => state.editDoc.articleImg,
        editForm: state => state.editDoc.editForm,
        resetEditForm: state => state.editDoc.resetEditForm,

        editCategoryForm: state => state.common.editCategoryForm,
        reseteditCategoryForm: state => state.common.reseteditCategoryForm,
        categoryList: state => state.common.categoryList,
        articleImgForm: state => state.common.articleImgForm,
        articleImgList: state => state.common.articleImgList,
        articleImgLoading: state => state.common.articleImgLoading
      }),
      editor () {
        return this.$refs.myQuillEditor.quill
      }
    },
    watch: {
    },
    created() {
      this.categoryA()
      this.articleImgListSearch(1)
      if (this.$route.query.id) {
        this.articleDetaileA({id: this.$route.query.id})
        this.editForm.id = this.$route.query.id
      } else {
        this.clearEditForm()
      }
    },
    mounted() {
      if (!Cookies.get("auth")) {
        this.$router.push('/login')
      }
    },
    methods: {
      ...mapActions('common', ['categoryA', 'modifyCategoryA', 'articleImgA']),
      ...mapActions('editDoc', ['modifyDocA', 'articleDetaileA', 'articleUpimgFilesA']),
      ...mapMutations('editDoc', ['clearEditForm']),

      async $imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
        let formdata = new FormData();
        formdata.append('files', $file)
        this.img_file[pos] = $file;


        let res = await upimgFiles(formdata)
        if (res.flag) {
          this.$notify({ title: '提示', message: '上传成功！', type: 'success' });
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          this.$refs.md.$img2Url(pos, res.data.remotefilePath);
        } else {
          this.$notify({ title: '提示', message: res.msg, type: 'success' });
        }
      },
      $imgDel(pos) {
        delete this.img_file[pos];
      },
      change(value, render){
        // render 为 markdown 解析后的结果[html]
        this.editForm.content = render;
      },
      onEditorReady (editor) {}, // 准备编辑器
      onEditorBlur () {}, // 失去焦点事件
      onEditorFocus () {}, // 获得焦点事件
      onEditorChange () {
        this.editForm.content = this.quillcontent
      }, // 内容改变事件

      // 富文本图片上传前
      beforeUpload () {
        // 显示loading动画
        this.quillUpdateImg = true
      },
      // 富文本图片上传zhong
      async uploadChange(data) {
        let formdata = new FormData();
        formdata.append("files", data.file);
        
        let res = await upimgFiles(formdata)
        if (res.flag) {
          this.$notify({ title: '提示', message: '上传成功！', type: 'success' });
          let quill = this.$refs.myQuillEditor.quill
          // 获取光标所在位置
          let length = quill.getSelection().index
          // 插入图片  res.info为服务器返回的图片地址
          quill.insertEmbed(length, 'image', res.data.remotefilePath)
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          this.$notify({ title: '提示', message: res.msg, type: 'success' });
        }
      },
      // 富文本图片上传失败
      uploadError () {
        // loading动画消失
        this.quillUpdateImg = false
        this.$message.error('图片插入失败')
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.modifyDocA()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 识别md文件
      async mdUploadChange (data) {
        let formdata = new FormData();
        formdata.append("files", data.file);
        let res = await recognizeFile(formdata)
        if (res.flag) {
          this.$notify({ title: '提示', message: '识别成功！', type: 'success' });
          this.editForm.mdContent = res.obj
        } else {
          this.$notify({ title: '提示', message: res.msg, type: 'success' });
        }
      },
      articleUploadChange (data) {
        let formdata = new FormData()
        formdata.append("files", data.file)

        this.articleUpimgFilesA(formdata)
      },
      // 提交分类
      modifyCategory (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.modifyCategoryA()
            this.editCategoryDialogClose()
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
      editCategoryDialogClose () {
        this.editCategoryDialogVisible = false
        this.$refs['editCategoryForm'].resetFields();
        Object.assign(this.editCategoryForm, this.reseteditCategoryForm);
      },
      editCategory (item) {
        this.editCategoryForm.category_name = item.category_name
        this.editCategoryForm.category_id = item.category_id
        this.editCategoryDialogVisible = true
      },
      categoryChange (val) {
        let obj= this.categoryList.find(i =>i.category_id === val)
        this.editForm.category = obj.category_name
        this.editForm.random_color = obj.random_color
      },
      articleImgListSearch (val) {
        if (val) {
          this.articleImgForm.pagingDto.pageNo = 1
        }
        this.articleImgA()
      },
      changeArticleImg (val) {
        this.articleImgForm.imgtype = val
        this.articleImgListSearch(1)
      },
      selectArticleImg (item) {
        this.editForm.imgUrl = item.imgurl
        this.articleImgDialogVisible = false
      }
    },
  }
</script>
<style lang="scss">
.editDoc-wrap{
  background-color: #fff;
  .doc-banner{
    width: 100%;
    height: 300px;
    text-align: center;
    background-image: url('~assets/images/doc_banner.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #61697c;
    -webkit-font-smoothing: antialiased;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    .doc-banner-box{
      width: 650px;
      vertical-align: middle;
      &>h2{
        margin-bottom: 8px;
        font-size: 34px;
        font-weight: 400;
        color: #fff;
      }
      .doc-banner-search{
        padding-top: 10px;
        width: 650px;
        margin: 20px auto 0;
        position: relative;
        z-index: 10;
        input{
          width: 100%;
          height: 45px;
          line-height: 25px;
          font-size: 16px;
          border: none;
          padding: 10px 15px;
          border-radius: 0;
        }
      }
    }
  }
  .editDoc-form{
    margin-top: 20px;
    .editDoc-form-breadcrumb{
      border-bottom: 1px solid #dedede;
      height: 50px;
      display: flex;
      align-items: center;
    }
    .demo-editForm{
      margin-top: 20px;
      .save-btn{
        margin-top: 10px;
      }
    }
    .articleUpload{
      .el-form-item__content{
        display: flex;
      }
    }
  }
  .change-edit{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
    .md-uploader{
      margin-right: 15px;
    }
  }
  .ql-editor{
    height: 800px;
  }
  .articleImg-uploader{
    .el-upload{
      width: 270px;
      height: 180px;
      border: 1px dashed #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-icon-plus{
        font-size: 20px;
      }
      .avatar{
        width: 100%;
        height: 100%;
      }
    }
  }
  .articleImg{
    .articleImg-head{
      span{
        cursor: pointer;
        padding: 5px 10px;
        margin-right: 15px;
        display: inline-block;
        font-size: 16px;
        color: #666;
        border: 1px solid #666;
        &:hover,
        &.on{
          background-color: #666;
          color: #fff;
        }
      }
    }
    .articleImg-list{
      border: 1px solid #666;
      min-height: 200px;
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      margin-top: 10px;
      span{
        width: 270px;
        height: 180px;
        overflow: hidden;
        cursor: pointer;
        margin-right: 10px;
        margin-bottom: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>