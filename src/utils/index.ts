import axios from 'axios'
import { ElMessage } from 'element-plus'

// import { ElMessage } from 'element-plus'
const service = axios.create({
  // baseURL:
  //   'https://www.fastmock.site/mock/9d368ec3466bb9fd180e2d326eb4ac3b/vue',
  timeout: 5000,
  // 开启携带cookie  默认不携带cookie
  withCredentials: true,
  // 下载文件用blob arraybuffer  转成二进制
  // responseType: 'blob',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
    // 'pc-token': '4a82b23dbbf3b23fd8aa291076e660ec' //后端提供
  }
})
service.interceptors.request.use((config) => {
  // config.headers = config.headers || {}
  // if (localStorage.getItem('token')) {
  //   config.headers.token = localStorage.getItem('token') || ''
  // }
  return config
})
service.interceptors.response.use(
  (res) => {
    const { status, data } = res
    // 捕获status
    if (status !== 200 && status !== 201 && status !== 204) {
      ElMessage.error(data.message)
      console.log(res)
      return Promise.reject(res)
    }
    // 捕获code
    console.log(res)
    return Promise.resolve(res)
    // return res.data
  },
  (err) => {
    console.log(err)
  }
)
export default service
