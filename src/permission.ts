import router from './router';
import monitor from './util/router/monitor';
import charge from './util/router/charge';
import setting from './util/router/setting';
import layoutpart from './util/router/layoutpart';

let registerRouteFresh = true;
const array:any = [];
const routearray = monitor.concat(charge, setting);
router.beforeEach(async (to, from, next) => {
  const account = window.localStorage.getItem('account');
  if (to.path === '/login') next();
  // 已经登录
  if (account) {
    // 第一次挂载路由
    if (registerRouteFresh) {
      routearray.forEach((v) => {
        layoutpart[0].children.push(v);
      });
      router.addRoute(layoutpart[0]);
      window.localStorage.setItem('menu', JSON.stringify(layoutpart));
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
