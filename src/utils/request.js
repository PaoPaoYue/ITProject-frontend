import axios from "axios";
import qs from "qs";
import Vue from "vue";
import store from '../store'

//添加请求拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//添加响应拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.resolve(error.response);
    }
);

axios.defaults.baseURL = "/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.timeout = 10000;

function checkStatus(response) {
    return new Promise((resolve, reject) => {
        if (response) {
            if (response.status === 200) {
                resolve([response.data, true])
            } else {
                resolve([{
                    status: response.status,
                    error: response.data
                }, false])
            }
        } else {
            reject("no response");
        }
    });
}

function refreshToken(response) {
    let token = response.headers['access-token']
    if (token) 
        store.dispatch('login', token)
}

function getCos() {
  var COS = require('cos-js-sdk-v5')
  var cos = new COS({
      getAuthorization: (options, callback)=>{
        Vue.prototype.$request.get('/api/cos/sts/img',null).then((res) => {
          if (res[1]) {
            callback({
              TmpSecretId: res[0].credentials.tmpSecretId,
              TmpSecretKey: res[0].credentials.tmpSecretKey,
              XCosSecurityToken: res[0].credentials.sessionToken,
              StartTime: res[0].startTime,
              ExpiredTime: res[0].expiredTime,
            });
          }
        }).catch(() => {
          this.loading = false;
        });
      },
  });
  return cos
}

function putObject(cos,[key, file]) {
  cos.putObject({
      Bucket: 'imgtestbucket-1302787472', 
      Region: 'ap-nanjing', 
      Key: key, 
      StorageClass: 'STANDARD',
      Body: file,
  }, (err, data) => {
      if (data) {
        const url = cos.getObjectUrl({
          Bucket: 'imgtestbucket-1302787472',
          Region: 'ap-nanjing',
          Key: key,
      });
      var imgurl=url.replace("http","https")
      return imgurl
      }
      else {
        console.log(err)    
      }
  });
}
export default {
    post(url, params) {
        return axios({
            headers: {
                "Authorization" : "Bearer " + (store.getters.isLogin ? store.getters.token : '')
            },
            method: "post",
            url,
            data: params
        }).then(response => {
            refreshToken(response)
            return checkStatus(response)
        });
    },
    get(url, params) {
        params = qs.stringify(params)
        return axios({
            headers: {
                "Authorization": "Bearer " + (store.getters.isLogin ? store.getters.token : '')
            },
            method: "get",
            url,
            params
        }).then(response => {
            refreshToken(response)
            return checkStatus(response)
        });
    },
    uploadImg(file,uid){
        var cos;
        var result;
        Promise
          .all([cos=getCos()]) 
          .then(() => {
            result=putObject(cos,[`${uid}`, file]);
          });
        return result;
        }     
}