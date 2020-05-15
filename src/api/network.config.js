/**
 * HTTP服务连接配置
 * 域名请求头及接口地址配置
 */
import environment from './environment';
export const DF_NETWORK_CONFIG = {
  domain: environment.baseDomain,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=UTF-8',
  },
  paths: {
    // 公用请求配置
    common: {
      demo: {
        url: '/tata-custom/api/kujiale/design/commentList',
        method: 'post',
      },
    },
  },
};
