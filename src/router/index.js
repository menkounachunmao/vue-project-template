import Vue from 'vue';
import VueRouter from 'vue-router';
import BydMallPlatform from '@/views/BydMallPlatform';
Vue.use(VueRouter);

const rootRoute = {
  path: '/',
  redirect: '/bydmall',
};

// 业务路由配置
const routeConfig = {
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
const router = new VueRouter({
  routes: [rootRoute, routeConfig],
});

export default router;
