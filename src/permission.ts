import { computed } from 'vue';
import store from './store/index';
import { routeTag, routearray } from './util/type/routetype';
import router from './router';

let registerRouteFresh = true;

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') next();
  // 已经登录
  if ((store.state as any).user.account !== '') {
    // 第一次挂载路由
    if (registerRouteFresh) {
      (store.state as any).user.routearray.forEach((v:routearray) => {
        router.addRoute(v);
      });
      next({ ...to, replace: true });
      registerRouteFresh = false;
    } else {
      next();
    }
    // 没有登录，返回登录页面
  } else {
    next('/login');
  }
});

export default router;
