import axios from 'axios'
import JSONbig from 'json-bigint'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net',
    timeout: 5000,
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
       try {
        return JSONbig.parse(data);
        // axios 默认在内部使用JSON.parse来处理后端返回的数据
       } catch (error) {
         return data
       }
    }]
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用  (这里可以验证登陆的token)
  instance.interceptors.request.use(config => {
    // 给请求头加添加Authorization，这样有权限的api就可以正常调用了
    config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('token')
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}
