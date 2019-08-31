import http from './http'
export const urlPrefix = "/api"

/**
 *    common
 */
export const getIndexBg = (data) => http(`./index_bg.html`, data, 'GET'); // 获取欢迎页背景
