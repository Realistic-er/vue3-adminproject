import { routeTag, routearray } from '../../util/type/routetype';

type menutype = {
  isCollapse: boolean,
  routeTagarray: routeTag[],
}
type obj1 = {
  name: string,
  title: string,
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
    isCollapse: (state:menutype) => state.isCollapse,
    routeTagarray: (state:menutype) => state.routeTagarray,
  },
  mutations: {
    changecollapse: (state:menutype) => {
      state.isCollapse = !state.isCollapse;
    },
    // change
    changerouteTag: (state:menutype, para:routearray) => {
      const index = state.routeTagarray.findIndex((v) => v.title === para.meta.title);
      // 如果不存在
      if (index === -1) {
        const obj:routeTag = {
          name: '',
          title: '',
        };
        obj.name = para.name;
        obj.title = para.meta.title;
        state.routeTagarray.push(obj);
      }
    },
    changeroute: (state:menutype, para:obj1) => {
      const index = state.routeTagarray.findIndex((v) => v.title === para.title);
      // 如果不存在
      if (index === -1) {
        // const obj:routeTag = {
        //   name: '',
        //   title: '',
        // };
        // obj.name = para.name;
        // obj.title = para.meta.title;
        state.routeTagarray.push(para);
      }
    },
    // 删除tag
    closeTag: (state:menutype, item:routeTag) => {
      const index = state.routeTagarray.indexOf(item);
      state.routeTagarray.splice(index, 1);
      // window.localStorage.setItem('tag', JSON.stringify(state.routeTagarray));
    },
    // jumpsetting
    jumpsetting: (state:menutype) => {
      const index = state.routeTagarray.findIndex((v) => v.title === '个人设置');
      if (index === -1) {
        const obj:routeTag = {
          name: 'setting',
          title: '个人设置',
        };
        state.routeTagarray.push(obj);
      }
    },
  },
};
export default menu;
