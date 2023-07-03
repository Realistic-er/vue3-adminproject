import { routearray } from './type/routetype';

const filterrouter = (a:routearray[]) => {
  const array:routearray[] = [];
  const account:any = window.localStorage.getItem('account');
  const arraychildren:routearray[] = a;
  a[0].children.forEach((i) => {
    const index = i.meta.role.indexOf(account);
    if (index !== -1) {
      array.push(i);
    }
  });
  arraychildren[0].children = array;
  console.log(array, arraychildren);
  return arraychildren;
};

export default filterrouter;
