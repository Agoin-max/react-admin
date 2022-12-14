// 封装axios

// 实例化 请求拦截器 响应拦截器

import axios from "axios"
import { getToken } from "./token"
import { history } from "./history"

const http = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数
    // 对响应数据做点什么
    const code = response.data.code
    if (code === 0) {
        return response.data
    } else {
        
    }
}, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数
    // 对响应数据做点什么
    console.dir(error)
    if (error.response.status === 401) {
        // 跳回到登录 reactRouter默认状态下 不支持在组件之外完成路由跳转
        history.push("/login")
    }
    return Promise.reject(error)
})

export { http }