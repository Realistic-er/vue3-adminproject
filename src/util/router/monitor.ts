import { routearray } from '../type/routetype';
import filterrouter from '../function';

const monitor:routearray[] = [
  {
    path: 'monitor',
    name: 'monitor',
    meta: {
      role: [],
      title: '系统监控',
      icon: 'Notification',
    },
    children: [
      // 数据监控
      {
        path: 'datamonitor',
        name: 'datamonitor',
        meta: {
          role: ['admin', 'staff', 'visit'],
          title: '数据监控',
          icon: 'Connection',
        },
        component: () => import('@/views/monitor/DataMonitor.vue'),
        children: [],
      },
      // 在线用户
      {
        path: 'onlineuser',
        name: 'onlineuser',
        meta: {
          role: ['admin', 'staff', 'visit'],
          title: '在线用户',
          icon: 'ChatDotRound',
        },
        component: () => import('@/views/monitor/OnlineUser.vue'),
        children: [],
      },
      // 缓存列表
      {
        path: 'savelist',
        name: 'savelist',
        meta: {
          role: ['admin', 'staff', 'visit'],
          title: '缓存列表',
          icon: 'Setting',
        },
        component: () => import('@/views/monitor/SaveList.vue'),
        children: [],
      },
      // 缓存监控
      {
        path: 'savemonitor',
        name: 'savemonitor',
        meta: {
          role: ['admin', 'staff', 'visit'],
          title: '缓存监控',
          icon: 'Clock',
        },
        component: () => import('@/views/monitor/SaveMonitor.vue'),
        children: [],
      },
      // 服务监控
      {
        path: 'servemonitor',
        name: 'servemonitor',
        meta: {
          role: ['admin', 'staff', 'visit'],
          title: '服务监控',
          icon: 'Position',
        },
        component: () => import('@/views/monitor/ServeMonitor.vue'),
        children: [],
      },
      // 定时任务
      {
        path: 'timetask',
        name: 'timetask',
        meta: {
          role: ['admin', 'staff', 'visit'],
          title: '定时任务',
          icon: 'Discount',
        },
        component: () => import('@/views/monitor/TimeTask.vue'),
        children: [],
      },
    ],
  },
];

export default filterrouter(monitor);
