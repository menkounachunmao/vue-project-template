// 开发环境配置
const ENVIRONMENT_DEV = {
  baseDomain: 'https://cbsuat.tata.com.cn',
};
// uat环境配置
const ENVIRONMENT_UAT = {
  baseDomain: 'https://cbsuat.tata.com.cn',
};
// 生产环境配置
const ENVIRONMENT_PRO = {
  baseDomain: 'https://cbsuat.tata.com.cn',
};

/**
 * 环境变量配置
 **/

let environment = {};
switch (process.env.VUE_APP_ENV) {
  case 'dev':
    environment = ENVIRONMENT_DEV;
    break;
  case 'uat':
    environment = ENVIRONMENT_UAT;
    break;
  case 'pro':
    environment = ENVIRONMENT_PRO;
    break;

  default:
    break;
}
export default environment;
