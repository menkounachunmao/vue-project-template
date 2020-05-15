import { fullRequest } from '../network.services';
import { DF_NETWORK_CONFIG } from '../network.config';

// 请求示例demo
export const getDemoData = (params) =>
  fullRequest(DF_NETWORK_CONFIG.paths.common.demo, params);
