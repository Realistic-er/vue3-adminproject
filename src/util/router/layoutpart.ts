import { routearray } from '../type/routetype';

const layoutpart:routearray[] = [
  {
    path: '',
    name: 'layoutpart',
    component: () => import('@/page/LayoutPart.vue'),
    meta: {
      role: [],
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index/FirstPage.vue'),
        meta: {
          role: [],
          title: '首页',
          icon: 'House',
        },
        children: [],
      },
    ],
  },
];

export default layoutpart;
