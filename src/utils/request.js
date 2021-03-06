import axios from "axios";
import COS from 'cos-js-sdk-v5'

import store from '../store'

import { COS_REGION, COS_IMG_BUCKET, COS_FILE_BUCKET } from '../it-project.config'


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
    if(!response || !response.headers) return
    let token = response.headers['access-token']
    if (token) 
        store.dispatch('login', token)
}

function getCos(response) {
    return new COS({
        getAuthorization: (options, callback) => {
            callback({
                TmpSecretId: response.credentials.tmpSecretId,
                TmpSecretKey: response.credentials.tmpSecretKey,
                XCosSecurityToken: response.credentials.sessionToken,
                StartTime: response.startTime,
                ExpiredTime: response.expiredTime
            })
        }
    })
}

function post(url, params) {
    
    return axios({
        headers: {
            "Authorization": "Bearer " + (store.getters.isLogin ? store.getters.token : '')
        },
        method: "post",
        url,
        data: params
    }).then(response => {
        refreshToken(response)
        return checkStatus(response)
    });
}

function get(url, params) {
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
}

function uploadObject(stsPath, bucket) {
    return (file, path) => {
        return get(stsPath)
            .then(([res, success]) => {
                return new Promise((resolve, ) => {
                    if (success) {
                        resolve([getCos(res), true])
                    } else {
                        resolve([res, false])
                    }
                })
            })
            .then(([res, success]) => {
                return new Promise((resolve, ) => {
                    if (success) {
                        res.putObject({
                            Bucket: bucket,
                            Region: COS_REGION,
                            Key: `${store.getters.uid}/`+path,
                            StorageClass: 'STANDARD',
                            Body: file,
                        }, (err, data) => {
                            if (data) {
                                let res = {
                                    location: 'https://'+data.Location,
                                    etag: data.ETag
                                }
                                resolve([res, true])
                            }
                            else {
                                let res = {
                                    status: err.statusCode,
                                    error: {
                                        code: err.Code,
                                        message: err.Message
                                    }
                                }
                                resolve([res, false])
                            }
                        })
                    } else {
                        resolve([res, false])
                    }
                })
            })
    }    
}

function deleteObject(stsPath, bucket) {
    return function(path) {
        return get(stsPath)
            .then(([res, success]) => {
                return new Promise((resolve, ) => {
                    if (success) {
                        resolve([getCos(res), true])
                    } else {
                        resolve([res, false])
                    }
                })
            })
            .then(([res, success]) => {
                return new Promise((resolve, ) => {
                    if (success) {
                        res.deleteObject({
                            Bucket: bucket,
                            Region: COS_REGION,
                            Key: `${store.getters.uid}/`+path,
                        }, (err, data) => {
                            if (data) {
                                resolve([{}, true])
                            }
                            else {
                                let res = {
                                    status: err.statusCode,
                                    error: {
                                        code: err.Code,
                                        message: err.Message
                                    }
                                }
                                resolve([res, false])
                            }
                        })
                    } else {
                        resolve([res, false])
                    }
                })
            })
    }
}


export default {
    post, 
    get, 
    uploadImg: uploadObject('/api/cos/sts/img', COS_IMG_BUCKET),
    uploadFile: uploadObject('/api/cos/sts/file', COS_FILE_BUCKET),
    deleteImg: deleteObject('/api/cos/sts/img', COS_IMG_BUCKET),
    deleteFile: deleteObject('/api/cos/sts/file', COS_FILE_BUCKET),
}
        