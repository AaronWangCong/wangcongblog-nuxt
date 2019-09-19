import http from './http'
export const urlPrefix = "/api"

/**
 *    common
 */
export const getIndexBg = (data) => http(`./index_bg.html`, data, 'GET'); // 获取欢迎页背景
export const getBaiDuTongJi = (data) => http(`https://api.baidu.com/json/tongji/v1/ReportService/getData`, data, 'POST'); // 获取百度统计数据
