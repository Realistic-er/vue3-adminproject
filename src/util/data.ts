export const data = [
  {
    value: '主类目',
    label: '主类目',
    children: [
      {
        value: '系统管理',
        label: '系统管理',
        children: [
          {
            value: '岗位管理',
            label: '岗位管理',
          },
          {
            value: '菜单管理',
            label: '菜单管理',
          },
          {
            value: '角色管理',
            label: '角色管理',
          },
          {
            value: '用户管理',
            label: '用户管理',
          },
          {
            value: '部门管理',
            label: '部门管理',
          },
          {
            value: '字典管理',
            label: '字典管理',
          },
        ],
      },
      {
        value: '系统监控',
        label: '系统监控',
        children: [
          {
            value: '数据监控',
            label: '数据监控',
          },
          {
            value: '在线用户',
            label: '在线用户',
          },
          {
            value: '缓存列表',
            label: '缓存列表',
          },
          {
            value: '缓存监控',
            label: '缓存监控',
          },
          {
            value: '服务监控',
            label: '服务监控',
          },
          {
            value: '定时任务',
            label: '定时任务',
          },
        ],
      },
    ],
  },
];

export const iconlist = [
  'Odometer', 'ChatSquare', 'ChatRound', 'ChatLineRound', 'ChatLineSquare',
  'ChatDotSquare', 'View', 'Notification', 'Connection', 'ChatDotRound',
  'Setting', 'Clock', 'Position', 'Discount',
];

export const datatree = [
  {
    label: '后台管理系统',
    children: [
      {
        label: '北京总公司',
        children: [
          {
            label: '研发部门',
            id: 'beijingyanfa',
          },
          {
            label: '市场部门',
            id: 'beijingshichang',
          },
          {
            label: '测试部门',
            id: 'beijingceshi',
          },
          {
            label: '财务部门',
            id: 'beijingcaiwu',
          },
          {
            label: '运维部门',
            id: 'beijingyunwei',
          },
        ],
      },
      {
        label: '上海分公司',
        children: [
          {
            label: '研发部门',
            id: 'shanghaiyanfa',
          },
          {
            label: '市场部门',
            id: 'shanghaishichang',
          },
          {
            label: '测试部门',
            id: 'shanghaiceshi',
          },
          {
            label: '财务部门',
            id: 'shanghaicaiwu',
          },
          {
            label: '运维部门',
            id: 'shanghaiyunwei',
          },
        ],
      },
    ],
  },
];
