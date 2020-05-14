import axios from 'axios';
import router from '../router';
const networkService = axios.create({
  // 设置超时时间
  timeout: 60000,
  baseURL: process.env.VUE_APP_BASE_URL,
});
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
networkService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
networkService.interceptors.response.use(
  (response) => {
    const responseCode = response.status;
    if (responseCode === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    // 1. 断网 或者 请求超时 状态
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes('timeout')) {
        console.log('网络请求超时！');
      } else {
        console.log('请检查网络链接！');
      }
      return Promise.reject('网络出错！');
    }
    // 2. 异常处理
    const responseCode = error.response.status;
    switch (responseCode) {
      // 401：未登录
      case 401:
        // 跳转登录页
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath,
          },
        });
        break;
      // 403: token过期
      case 403:
        // 错误提示
        // : TODO 根据样式框架
        // Message({
        //     type: 'error',
        //     message: '登录信息过期，请重新登录'
        // });
        // 清除token
        localStorage.removeItem('token');
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
        }, 1000);
        break;
      // 404请求不存在
      case 404:
        // TODO
        // Message({
        //     message: '网络请求不存在',
        //     type: 'error'
        // })
        break;
      // 其他错误，直接抛出错误提示
      default:
      // TODO
      // Message({
      //     message: error.response.data.message,
      //     type: 'error'
      // })
    }
    return Promise.reject(error);
  }
);

export default networkService;
