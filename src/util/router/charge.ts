import { routearray } from '../type/routetype';

const charge:routearray[] = [
  // 数据监控
  {
    path: 'charge/jobcharge',
    name: 'jobcharge',
    meta: {
      role: ['admin', 'staff', 'visit'],
    },
    component: () => import('@/views/charge/JobCharge.vue'),
  },
  // 在线用户
  {
    path: 'charge/menucharge',
    name: 'menucharge',
    meta: {
      role: ['admin', 'staff', 'visit'],
    },
    component: () => import('@/views/charge/MenuCharge.vue'),
  },
  // 缓存列表
  {
    path: 'charge/rolecharge',
    name: 'rolecharge',
    meta: {
      role: ['admin', 'staff', 'visit'],
    },
    component: () => import('@/views/charge/RoleCharge.vue'),
  },
  // 缓存监控
  {
    path: 'charge/usercharge',
    name: 'usercharge',
    meta: {
      role: ['admin', 'staff', 'visit'],
    },
    component: () => import('@/views/charge/UserCharge.vue'),
  },
  // 服务监控
  {
    path: 'charge/partcharge',
    name: 'partcharge',
    meta: {
      role: ['admin', 'staff', 'visit'],
    },
    component: () => import('@/views/charge/PartCharge.vue'),
  },
  // 定时任务
  {
    path: 'charge/dictorycharge',
    name: 'dictorycharge',
    meta: {
      role: ['admin', 'staff', 'visit'],
    },
    component: () => import('@/views/charge/DictoryCharge.vue'),
  },
];

export default charge;
