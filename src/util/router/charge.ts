import { routearray } from '../type/routetype';
import filterrouter from '../function';

const charge:routearray[] = [
  {
    path: 'charge',
    name: 'charge',
    meta: {
      role: [],
      title: '系统管理',
    },
    children: [
      // 数据监控
      {
        path: 'charge/jobcharge',
        name: 'jobcharge',
        meta: {
          role: ['admin', 'staff', 'visit'],
        },
        component: () => import('@/views/charge/JobCharge.vue'),
        children: [],
      },
      // 在线用户
      {
        path: 'charge/menucharge',
        name: 'menucharge',
        meta: {
          role: ['admin', 'staff', 'visit'],
        },
        component: () => import('@/views/charge/MenuCharge.vue'),
        children: [],
      },
      // 缓存列表
      {
        path: 'charge/rolecharge',
        name: 'rolecharge',
        meta: {
          role: ['admin', 'staff', 'visit'],
        },
        component: () => import('@/views/charge/RoleCharge.vue'),
        children: [],
      },
      // 缓存监控
      {
        path: 'charge/usercharge',
        name: 'usercharge',
        meta: {
          role: ['admin', 'staff', 'visit'],
        },
        component: () => import('@/views/charge/UserCharge.vue'),
        children: [],
      },
      // 服务监控
      {
        path: 'charge/partcharge',
        name: 'partcharge',
        meta: {
          role: ['admin', 'staff', 'visit'],
        },
        component: () => import('@/views/charge/PartCharge.vue'),
        children: [],
      },
      // 定时任务
      {
        path: 'charge/dictorycharge',
        name: 'dictorycharge',
        meta: {
          role: ['admin', 'staff', 'visit'],
        },
        component: () => import('@/views/charge/DictoryCharge.vue'),
        children: [],
      },
    ],
  },

];

export default filterrouter(charge);
