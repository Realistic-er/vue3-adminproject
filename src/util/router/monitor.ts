import { routearray } from '../type/routetype';

const monitor:routearray[] = [
  // 数据监控
  {
    path: 'monitor/datamonitor',
    name: 'layoutpart',
    meta: {
      role: ['admin', 'staff', 'visit'],
    },
    component: () => import('@/views/monitor/DataMonitor.vue'),
  },
  // 在线用户
  {
    path: 'monitor/onlineuser',
    name: 'onlineuser',
    meta: {
      role: ['admin', 'staff', 'visit'],
    },
    component: () => import('@/views/monitor/OnlineUser.vue'),
  },
  // 缓存列表
  {
    path: 'monitor/savelist',
    name: 'savelist',
    meta: {
      role: ['admin', 'staff', 'visit'],
    },
    component: () => import('@/views/monitor/SaveList.vue'),
  },
  // 缓存监控
  {
    path: 'monitor/savemonitor',
    name: 'savemonitor',
    meta: {
      role: ['admin', 'staff', 'visit'],
    },
    component: () => import('@/views/monitor/SaveMonitor.vue'),
  },
  // 服务监控
  {
    path: 'monitor/savemonitor',
    name: 'savemonitor',
    meta: {
      role: ['admin', 'staff', 'visit'],
    },
    component: () => import('@/views/monitor/SaveMonitor.vue'),
  },
  // 定时任务
  {
    path: 'monitor/timetask',
    name: 'timetask',
    meta: {
      role: ['admin', 'staff', 'visit'],
    },
    component: () => import('@/views/monitor/TimeTask.vue'),
  },
];

export default monitor;
