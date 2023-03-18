export type routesign = {
  path: string,
  name: string,
  meta: {
    role: string[],
    title?: string,
    icon?: string,
  },
  children: routesign[]
}

export const totalroute:routesign[] = [
  {
    path: 'charge',
    name: 'charge',
    meta: {
      role: [],
      title: '系统管理',
      icon: 'Odometer',
    },
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
        children: [],
      },
    ],
  },
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
        children: [],
      },
    ],
  },
];
