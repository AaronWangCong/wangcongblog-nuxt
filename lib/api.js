import http from './http'
export var urlPrefix = "/oa"
export var urlBaidu = "/json"
if(process.server) {
  urlBaidu = 'https://api.baidu.com/json'
}

/**
 *    common
 */
export const getIndexBg = (data) => http(`./index_bg.html`, data, 'GET'); // 获取欢迎页背景
export const getBaiDuTongJi = (data) => http(urlBaidu +`/tongji/v1/ReportService/getData`, data, 'POST'); // 获取百度统计数据

/**
 *    home
 */
export const noticeMessigeInfo = (data) => http(urlPrefix +`/noticeInfo`, data, 'GET'); // 获取首页滚屏通知
export const addNoticeMessige = (data) => http(urlPrefix +`/addnotice`, data, 'POST'); // 添加首页滚屏通知