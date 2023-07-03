import { routearray } from '../type/routetype';
import filterrouter from '../function';

const setting:routearray[] = [
  {
    path: '/person',
    name: 'person',
    component: () => import('@/page/LayoutPart.vue'),
    meta: {
      role: ['admin', 'staff', 'visit'],
      title: '',
    },
    children: [
      {
        path: 'setting',
        name: 'setting',
        meta: {
          role: ['admin', 'staff', 'visit'],
          title: '个人设置',
          icon: 'Setting',
        },
        component: () => import('@/views/setting/PersonSetting.vue'),
        children: [],
      },
    ],
  },
];

export default setting;
