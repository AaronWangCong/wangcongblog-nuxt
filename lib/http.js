import axios from 'axios'
import qs from 'qs' // 需要qs支持 npm install qs
// application/x-www-form-urlencoded
export default (url = '', data = {}, type = 'GET', contentType) => {
  return new Promise((resolve, reject) => {
    let requestConfig = {
      method: type,
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': contentType ? contentType : 'application/json'
      },
      timeout: 10000
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