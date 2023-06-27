import router from './router';
import monitor from './util/router/monitor';
import charge from './util/router/charge';
import layoutpart from './util/router/layoutpart';
import setting from './util/router/setting';

let registerRouteFresh = true;
const array:any = [];
export const routearray = layoutpart.concat(charge, monitor, setting);
// console.log(routearray);
router.beforeEach(async (to, from, next) => {
  const account = window.localStorage.getItem('account');
  if (to.path === '/login') next();
  // 已经登录
  if (account) {
    // 第一次挂载路由
    if (registerRouteFresh) {
      routearray.forEach((v) => {
        // console.log(v);
        router.addRoute(v);
      });
      window.localStorage.setItem('menu', JSON.stringify(routearray));
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
