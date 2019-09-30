import { modifyDoc, articleList, articleDetaile, removeDoc, upimgFiles, articleListUpDown, recognizeFile, articleUpimgFiles } from '../../lib/api'
import { Notification } from 'element-ui'

export default {
  // 新增编辑文章
  async modifyDocA ({state, commit, dispatch}, params) {
    commit('changeSubmitLoading', true)
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
