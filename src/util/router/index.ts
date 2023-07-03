import { routearray } from '../type/routetype';

const index:routearray[] = [
  {
    path: '/first',
    name: 'first',
    component: () => import('@/page/LayoutPart.vue'),
    meta: {
      role: [],
      title: '',
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

export default index;
