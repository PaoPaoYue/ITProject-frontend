"use strict";

import axios from "axios";
import qs from "qs";

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
        if (
            response &&
            (response.status === 200 ||
                response.status === 304 ||
                response.status === 400)
        ) {
            resolve(response.data);
        } else if (response.status === 404) {
            reject({
                status: response.status,
                message: "url error"
            });
        } else if (response.status >= 500) {
            reject({
                status: response.status,
                message: "server error"
            });
        } else {
            reject({
                status: response.status,
                message: "network error"
            });
        }
    });
}

export default {
    post(url, params) {
        return axios({
            method: "post",
            url,
            data: params
        }).then(response => {
            return checkStatus(response);
        });
    },
    get(url, params) {
        params = qs.stringify(params);
        return axios({
            method: "get",
            url,
            params
        }).then(response => {
            return checkStatus(response);
        });
    }
};