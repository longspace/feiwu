import axios from 'axios';
import { message } from 'ant-design-vue';

message.config({
  top: `3px`,
  duration: 1,
  maxCount: 3,
});

// axios 实例配置
const request = axios.create({
    baseURL:'/api',
    timeout:5000,
    // withCredentials:true
});

// 添加请求拦截器
request.interceptors.request.use(config => {
    // message.loading('正在为您加载资源...');
    if (config.headers['method'] == 'post') {
        // config.headers['Content-Type'] = "application/json"
        if (config.url == 'uploadSingleImg') {
            config.headers['Content-Type'] = 'multipart/form-data';
            console.log("multipart/form-data")
        }else{
            config.headers['Content-Type'] = "application/json"
        }
    }
    if (!config.headers['Auth-Token'] && localStorage.getItem('AuthToken')) {
        config.headers['Auth-Token'] = localStorage.getItem('AuthToken')
    }
    return config
}, error => {
    return Promise.reject(error);
})

// 添加响应拦截器
request.interceptors.response.use(response => {
    // message.success('服务器响应了您的请求');
    const res = response.data;
    if(res.code == 401 ){ // 未登录
      message.error("您未登录或登录超时!");
      window.location.href ="/"
    }else if(res.code == 402){

    }else if(res.code == 501){ // 请求频繁，限制5分钟

    }
    return response;
}, error => {
    message.error("请检查请求的资源是否存在!");
    console.log('err:',error)
    return Promise.reject(error);
});

export default request;
