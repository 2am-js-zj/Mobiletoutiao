import axios from "axios";
import store from "@/store";
import JSONBig from 'json-bigint'
const request = axios.create({
    baseURL: 'http://toutiao.itheima.net'//基础路径
})


// 自定义后端返回的原始数据
transformResponse: [function (data) {
    // axios 默认会在内部处理后端返回的数据

    // 自定义后端返回的原始数据，说白了就是JSON格式的字符串
    try {
        return JSONBig.parse(data)
    } catch (err) {
        return data
    }
}]

// 请求拦截器
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // config本次请求的请求配置对象
    // console.log(config)
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }

    // 这里一定要返回config配置对象，否则请求在这里就会停止，出不去了
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})


// 响应拦截器


export default request