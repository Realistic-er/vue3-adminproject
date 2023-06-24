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
      ],
    };
  },
  getters: {
    isCollapse: (state:menutype) => state.isCollapse,
    routeTagarray: (state:menutype) => state.routeTagarray,
  },
  mutations: {
    changecollapse: (state:menutype) => {
      state.isCollapse = !state.isCollapse;
    },
    // change
    changerouteTag: (state:menutype, para:routeTag[]) => {
      state.routeTagarray = para;
    },
    // 删除tag
    closeTag: (state:menutype, item:routeTag) => {
      const index = state.routeTagarray.indexOf(item);
      state.routeTagarray.splice(index, 1);
      // window.localStorage.setItem('tag', JSON.stringify(state.routeTagarray));
    },
  },
};
export default menu;
