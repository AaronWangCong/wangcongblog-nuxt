import axios from 'axios'
import qs from 'qs' // 需要qs支持 npm install qs
import Cookies from 'js-cookie'
// application/x-www-form-urlencoded
export default (url = '', data = {}, type = 'GET', contentType, timeout) => {
  return new Promise((resolve, reject) => {
    let requestConfig = {
      method: type,
      url: url,
      headers: {
        'loginedtoken': Cookies.get("auth") ? Cookies.get("auth") : '',
        'Accept': 'application/json',
        'Content-Type': contentType ? contentType : 'application/json'
      },
      timeout: timeout ? timeout : 20000
    };

    switch (type.toUpperCase()) {
      case "GET":
        requestConfig.params = data;
        requestConfig.paramsSerializer = params => {
          return qs.stringify(params, { indices: false })
        };
        break;
      case "DELETE":
        requestConfig.params = data;
        break;
      case "POST":
        requestConfig.data = data;
        break;
      case "PUT":
        requestConfig.data = data;
        break;
    }

    if ((type === 'POST' || type === 'PUT') && contentType !== 'multipart/form-data') {
      requestConfig.data = contentType ? qs.stringify(data) : JSON.stringify(data);
    }

    axios(requestConfig).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    })
  });
}