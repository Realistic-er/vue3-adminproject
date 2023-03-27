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
          name: 'index',
          title: '首页',
        },
      ],
    };
  },
  getters: {
    getrouteTagarray: (state:menutype) => {
      let array = [];
      const tag = JSON.parse(window.localStorage.getItem('tag') as string);
      if (tag === null) {
        array = state.routeTagarray;
      } else {
        array = tag;
      }
      return array;
    },
  },
  mutations: {
    changecollapse: (state:menutype) => {
      state.isCollapse = !state.isCollapse;
    },
    // change
    changerouteTag: (state:menutype, para:routeTag) => {
      if (para.name !== 'index') {
        // 判断如果不存在
        const index = state.routeTagarray.findIndex((item) => item.name === para.name);
        // 如果不存在
        if (index === -1) {
          const object = {
            name: '',
            title: '',
          };
          object.name = para.name;
          object.title = para.title;
          state.routeTagarray.push(object);
          window.localStorage.setItem('tag', JSON.stringify(state.routeTagarray));
        }
      }
    },
    // 删除tag
    closeTag: (state:menutype, item:routeTag) => {
      const index = state.routeTagarray.findIndex((val) => val.name === item.name);
      state.routeTagarray.splice(index, 1);
      window.localStorage.setItem('tag', JSON.stringify(state.routeTagarray));
    },
  },
};
export default menu;
