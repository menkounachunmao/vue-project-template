import Vue from 'vue';
import VueRouter from 'vue-router';
import BydMallPlatform from '@/views/BydMallPlatform';
Vue.use(VueRouter);

const ROOT_ROUTE = {
  path: '/',
  redirect: '/bydmall/home',
};

// 业务路由配置
const ROUTE_CONFIG = {
  path: '/bydmall',
  name: 'bydmall',
  component: BydMallPlatform,
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/Home'),
      children: [],
    },
  ],
};

// 创建路由实例
let router = new VueRouter({
  routes: [ROOT_ROUTE, ROUTE_CONFIG],
});

export default router;
