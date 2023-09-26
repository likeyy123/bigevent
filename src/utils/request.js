import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
const baseUrl = 'http://big-event-vue-api-t.itheima.net'
import router from '@/router'
const instance = axios.create({
  baseUrl,
  timeout: 10000
})
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 根据接口文档查看，code为0时表示成功
    if (res.data.code === 0) {
      return res
    }
    //处理业务失败，给错误提示
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // 处理401问题 401 权限不足或token过期 =>拦截登陆
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // 错误的默认情况
    ElMessage.error(err.data.message || '服务异常')
    return Promise.reject(err)
  }
)

//因为获取不到登录和注册接口因此折叠下列代码
// 登录访问拦截（无token或者不在登录页时，强制跳转到注册页）
// router.beforeeach((to) => {
//   const userStore = useUserStore()
//   if (!userStore.token && to.path !== '/login') return '/login'
//   return true
// })
export default instance
export { baseUrl }
