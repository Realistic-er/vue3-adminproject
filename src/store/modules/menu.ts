import { routeTag } from '../../util/type/routetype';

type menutype = {
  isCollapse: boolean,
  routeTagarray: routeTag[],
}
const menu = {
  state() {
    return {
      isCollapse: false,
      routeTagarray: [
        {
          path: '/index',
          name: 'index',
          title: '首页',
        },
      ],
    };
  },
  mutations: {
    changecollapse: (state:menutype) => {
      state.isCollapse = !state.isCollapse;
    },
    // change
    changerouteTag: (state:menutype, para:routeTag) => {
      state.routeTagarray.push(para);
    },
  },
};
export default menu;
