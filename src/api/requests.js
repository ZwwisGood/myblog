//二次封装axios
import axios from 'axios'

const requests = axios.create({
    //配置对象
    //代表请求超时的事件
    timeout: 5000,
})
//响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data;
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(error)
})

export default requests