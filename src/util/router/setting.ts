import { routearray } from '../type/routetype';
import filterrouter from '../function';

const monitor:routearray[] = [
  {
    path: 'setting',
    name: 'setting',
    meta: {
      role: [],
      title: '个人设置',
      icon: 'Setting',
    },
    component: () => import('@/views/setting/PersonSetting.vue'),
    children: [
    ],
  },
];

export default filterrouter(monitor);
