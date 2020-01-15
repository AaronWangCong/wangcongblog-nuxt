import { modifyDoc, articleList, articleDetaile, removeDoc, upimgFiles, articleListUpDown, recognizeFile, articleUpimgFiles } from '../lib/api'

const state = () => ({
  editForm: {
    title: '',
    category: '',
    category_id: '',
    random_color: '',
    imgUrl: '',
    summary: '',
    content: '',
    mdContent: '',
    id: ''
  },
  resetEditForm: {
    title: '',
    category: '',
    category_id: '',
    random_color: '',
    imgUrl: '',
    summary: '',
    content: '',
    mdContent: '',
    id: ''
  },
  loading: false,
  articleDetaile: {},
  upimgFilesUrl: '',
  pageTotal: 0,
  pageUpDown: [],
  submitLoading: false
})

const actions = {
  // 新增编辑文章
  async modifyDocA ({state, commit, dispatch, rootState}, params) {
    commit('changeSubmitLoading', true)
    state.editForm.author = rootState.login.userInfo.nick_name
    state.editForm.uid = rootState.login.userInfo.uid
    let res = await modifyDoc(state.editForm)
    if (res.flag) {
      commit('changeSubmitLoading', false)
      if (!state.editForm.id) {
        commit('clearEditForm')
      }
      Notification({ title: '提示', message: '发布成功！', type: 'success' });
    } else {
      commit('changeSubmitLoading', false)
      Notification({ title: '提示', message: res.msg, type: 'success' });
    }
  },
  // 查询文章详情
  async articleDetaileA ({state, commit, dispatch}, params) {
    commit('cleararticleDetaile')
    commit('changeloading', true)
    let res = await articleDetaile(params);
    if (res) {
      commit('changeloading', false)
      commit('articleDetaileM', res)
    }
  },
  // 删除文章
  async removeDocA ({state, commit, dispatch}, params) {
    let res = await removeDoc(params)
    if (res) {
      Notification({ title: '提示', message: '删除成功！', type: 'success' });
    }
  },
  // 编辑文章中上传图片
  async upimgFilesA ({state, commit, dispatch}, params) {
    let res = await upimgFiles(params)
    if (res.flag) {
      Notification({ title: '提示', message: '上传成功！', type: 'success' });
      commit('upimgFilesM', res)
    } else {
      Notification({ title: '提示', message: res.msg, type: 'success' });
    }
  },
  // 查询文章上下篇的id
  async articleListUpDownA ({state, commit, dispatch}, params) {
    let res = await articleListUpDown(params);
    if (res.flag) {
      commit('articleListUpDownm', res)
    }
  },
  // 识别md文件
  async recognizeFileA ({state, commit, dispatch}, params) {
    let res = await recognizeFile(params)
    if (res.flag) {
      Notification({ title: '提示', message: '识别成功！', type: 'success' });
      // commit('recognizeFileM', res)
    } else {
      Notification({ title: '提示', message: res.msg, type: 'success' });
    }
  },
  // 上传文章图片
  async articleUpimgFilesA ({state, commit, dispatch}, params) {
    let res = await articleUpimgFiles(params)
    if (res.flag) {
      Notification({ title: '提示', message: '上传成功！', type: 'success' });
      commit('articleUpimgFilesM', res)
    } else {
      Notification({ title: '提示', message: res.msg, type: 'success' });
    }
  }
}

const mutations = {
  articleDetaileM(state, data) {
    state.articleDetaile = data.obj

    state.editForm.title = state.articleDetaile.title
    state.editForm.id = state.articleDetaile.id
    state.editForm.imgUrl = state.articleDetaile.imgUrl
    state.editForm.category = state.articleDetaile.category
    state.editForm.category_id = state.articleDetaile.category_id
    state.editForm.random_color = state.articleDetaile.random_color
    state.editForm.summary = state.articleDetaile.summary
    state.quillcontent = state.articleDetaile.content
    state.articleDetaile.mdContent ? state.editForm.mdContent = state.articleDetaile.mdContent : state.editForm.mdContent = state.articleDetaile.content
  },
  changeloading(state, data) {
    state.loading = data
  },
  cleararticleDetaile(state, data) {
    state.articleDetaile = []
  },
  upimgFilesM (state, data) {
    state.upimgFilesUrl = data.data.url
  },
  articleListUpDownm (state, data) {
    state.pageUpDown = data.rows
  },
  changeSubmitLoading (state, data) {
    state.submitLoading = data
  },
  articleUpimgFilesM (state, data) {
    state.editForm.imgUrl = data.data.remotefilePath
  },
  clearEditForm (state) {
    Object.assign(state.editForm, state.resetEditForm)
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}