export default [
  {
    label: '系统管理',
    value: 'charge',
    children: [
      {
        path: '/part/partcharge',
        method: 'get',
        label: '岗位管理',
      },
      {
        path: '/charge/menucharge',
        method: 'get',
        label: '菜单管理',
      },
      {
        path: '/role/rolecharge',
        method: 'get',
        label: '角色管理',
      },
      {
        path: '/user/usercharge',
        method: 'get',
        label: '用户管理',
      },
      {
        path: '/part/partcharge',
        method: 'get',
        label: '部门管理',
      },
      {
        path: '/dictory/dictorycharge',
        method: 'get',
        label: '字典管理',
      },
    ],
  },
  {
    label: '系统监控',
    value: '系统监控',
    children: [
      {
        path: '/monitor/onlineuser',
        method: 'get',
        label: '在线用户',
      },
      {
        path: '/monitor/servemonitor',
        method: 'get',
        label: '服务监控',
      },
    ],
  },
];
