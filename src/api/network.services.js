import axios from 'axios';
import router from '../router';
import { DF_NETWORK_CONFIG } from './network.config';
import { Notification } from 'element-ui';
let networkService = axios.create({
  // 设置超时时间
  timeout: 60000,
  headers: DF_NETWORK_CONFIG.headers,
});
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
networkService.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');
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
    let responseCode = response.status;
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
    let responseCode = error.response.status;
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
        Notification.error({
          title: '网络请求出错',
          message: '登录信息过期，请重新登录',
          position: 'bottom-left',
        });
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
        Notification.error({
          title: '网络请求出错',
          message: '网络请求不存在',
          position: 'bottom-left',
        });
        break;
      // 其他错误，直接抛出错误提示
      default:
        Notification.error({
          title: '网络请求出错',
          message: error.response.data.message,
          position: 'bottom-left',
        });
    }
    return Promise.reject(error);
  }
);

/* 统一封装get请求 */
export const get = (url, params = {}, config = {}) => {
  params['timestamp'] = new Date().getTime() + '';
  return new Promise((resolve, reject) => {
    networkService
      .get(url, params, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* 统一封装post请求  */
export const post = (url, params, config = {}) => {
  console.log(url);
  console.log(params);
  console.log(config);
  return new Promise((resolve, reject) => {
    networkService
      .post(url, params, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 *使用domain的post请求
 * @param {请求地址} url
 * @param {请求数据} params
 * @param {请求配置} config
 */
export const fullPost = (url, params, config = {}) => {
  return post(DF_NETWORK_CONFIG.domain + url, params, config);
};

/**
 *使用domain的get请求
 * @param {请求地址} url
 * @param {请求数据} params
 * @param {请求配置} config
 */
export const fullGet = (url, params = {}, config = {}) => {
  return get(DF_NETWORK_CONFIG.domain + url, params, config);
};

/**
 * 使用domain的请求
 */
export const fullRequest = (requestOptions, params = {}, options = {}) => {
  if (requestOptions.method === 'post') {
    return fullPost(requestOptions.url, params, options);
  } else if (requestOptions.method === 'get') {
    return fullGet(requestOptions.url, params, options);
  } else {
    return;
  }
};

/**
 * 不使用domain的请求
 */
export const quickRequest = (requestOptions, params = {}, options = {}) => {
  if (requestOptions.method === 'post') {
    return post(requestOptions.url, params, options);
  } else if (requestOptions.method === 'get') {
    return post(requestOptions.url, params, options);
  } else {
    return;
  }
};
export default networkService;
