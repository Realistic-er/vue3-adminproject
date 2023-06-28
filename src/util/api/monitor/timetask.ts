import Mock from 'mockjs';
import request from '../../request/axios';
import { name, country, province } from '../../type/servemonitor';
import data from '../../timetask';

const { Random } = Mock;
const infoList = Mock.mock(
  {
    data,
  },
);

Mock.mock('/monitor/timetask', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: infoList,
  }
));

// 登录
export default function gettimetask() {
  return request({
    url: '/monitor/timetask',
    method: 'get',
  });
}
