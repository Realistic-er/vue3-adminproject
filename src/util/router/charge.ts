import { routearray } from '../type/routetype';
import filterrouter from '../function';

const charge:routearray[] = [
  {
    path: '/charge',
    name: 'charge',
    meta: {
      role: [],
      title: '系统管理',
      icon: 'Odometer',
    },
    component: () => import('@/page/LayoutPart.vue'),
    children: [
      // 数据监控
      {
        path: 'jobcharge',
        name: 'jobcharge',
        meta: {
          role: ['admin', 'staff', 'visit'],
          title: '岗位管理',
          icon: 'ChatSquare',
        },
        component: () => import('@/views/charge/JobCharge.vue'),
        children: [],
      },
      // 在线用户
      {
        path: 'menucharge',
        name: 'menucharge',
        meta: {
          role: ['admin', 'staff', 'visit'],
          title: '菜单管理',
          icon: 'ChatRound',
        },
        component: () => import('@/views/charge/MenuCharge.vue'),
        children: [],
      },
      // 缓存列表
      {
        path: 'rolecharge',
        name: 'rolecharge',
        meta: {
          role: ['admin', 'staff', 'visit'],
          title: '角色管理',
          icon: 'ChatLineRound',
        },
        component: () => import('@/views/charge/RoleCharge.vue'),
        children: [],
      },
      // 缓存监控
      {
        path: 'usercharge',
        name: 'usercharge',
        meta: {
          role: ['admin', 'staff', 'visit'],
          title: '用户管理',
          icon: 'ChatLineSquare',
        },
        component: () => import('@/views/charge/UserCharge.vue'),
        children: [],
      },
      // 服务监控
      {
        path: 'partcharge',
        name: 'partcharge',
        meta: {
          role: ['admin', 'staff', 'visit'],
          title: '部门管理',
          icon: 'ChatDotSquare',
        },
        component: () => import('@/views/charge/PartCharge.vue'),
        children: [],
      },
      // 定时任务
      {
        path: 'dictorycharge',
        name: 'dictorycharge',
        meta: {
          role: ['admin', 'staff', 'visit'],
          title: '字典管理',
          icon: 'View',
        },
        component: () => import('@/views/charge/DictoryCharge.vue'),
        children: [],
      },
    ],
  },
];

export default filterrouter(charge);
