import http from './http'
export var urlPrefix = "/oa"
export var urlBaidu = "/json"
if(process.server) {
  urlBaidu = 'https://api.baidu.com/json'
}

/**
 *    common
 */
export const getIndexBg = (data) => http(`./index_bg.html`, data, 'GET') // 获取欢迎页背景
export const getBaiDuTongJi = (data) => http(urlBaidu +`/tongji/v1/ReportService/getData`, data, 'POST') // 获取百度统计数据
export const loginApi = data => http( urlPrefix+"/login", data, "POST")        // 登录
export const logoutApi = () => http( urlPrefix + "/quit", {}, "POST")             // 登出
export const getUserInfoApi = () => http( urlPrefix+"/user/auth", {}, "GET")

/**
 *    home
 */
export const noticeMessige = (data) => http(urlPrefix +`/noticeMessige`, data, 'GET') // 获取首页滚屏通知
export const addNoticeMessige = (data) => http(urlPrefix +`/addnotice`, data, 'POST') // 添加首页滚屏通知

export const modifyDoc = (data) => http(urlPrefix +`/user/modifyDoc`, data, 'POST') // 创建一篇文章
export const articleList = (data) => http(urlPrefix +`/articleList`, data, 'POST') // 查询文章列表
export const articleDetaile = (data) => http(urlPrefix +`/articleList/${data.id}`, data, 'GET') // id查询文章
export const removeDoc = (data) => http(urlPrefix +`/user/removeDoc`, data, 'post') // 删除

export const articleListUpDown = (data) => http(urlPrefix +`/articleListUpDown/${data.id}`, data, 'GET') // 查询上一篇下一篇文章的id

/**
 *    editDoc
 */
export const upimgFiles = (data) => http(urlPrefix +`/user/upimgFiles`, data, 'post') // 上传文章详情图
export const articleUpimgFiles = (data) => http(urlPrefix +`/user/articleUpimgFiles`, data, 'post') // 上传文章图
export const recognizeFile = (data) => http(urlPrefix +`/user/recognizeFile`, data, 'post') // 识别md文件
export const modifyCategory = (data) => http(urlPrefix +`/user/modifyCategory`, data, 'POST') // 创建修改分类
export const category = (data) => http(urlPrefix +`/category`, data, 'GET') // 查询分类