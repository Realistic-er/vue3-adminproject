import Mock from 'mockjs';
import request from '../../request/axios';
import { name, country, province } from '../../type/servemonitor';

const { Random } = Mock;
const infoList = Mock.mock(
  {
    'data|10-20': [
      {
        'nameid|+1': 0,
        name: Random.pick(name, 3, 6),
        country: Random.pick(country, 4, 6),
        province: Random.pick(province, 4, 6),
      },
    ],
  },
);

Mock.mock('/monitor/servemonitor', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: infoList,
  }
));

// 登录
export default function getinfoList() {
  return request({
    url: '/monitor/servemonitor',
    method: 'get',
  });
}
