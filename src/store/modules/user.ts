import { routeTag, routearray } from '../../util/type/routetype';
import index from '../../util/router/index';
import monitor from '../../util/router/monitor';
import charge from '../../util/router/charge';
import setting from '../../util/router/setting';
import filterrouter from '../../util/function';

type usertype = {
  account: string,
  routearray: routearray[],
}
const menu = {
  state() {
    return {
      account: '',
      routearray: [],
    };
  },
  getters: {
    // isCollapse: (state:menutype) => state.isCollapse,
    // routeTagarray: (state:menutype) => state.routeTagarray,
  },
  mutations: {
    changeroutess: (state:usertype, para:string) => {
      state.account = para;
      const array:routearray[] = index.concat(charge, monitor, setting);
      const array1:routearray[] = [];
      array.forEach((v:routearray) => {
        const array2:routearray[] = [];
        v.children.map((i:routearray) => i.meta.role.indexOf(para) !== -1);
        // const index = i.meta.role.indexOf(para);
        // if (index !== -1) {
        //   array2.push(i);
        // });
        // array2.children = array1;
      });
      state.routearray = array;
    },
  },
};
export default menu;
