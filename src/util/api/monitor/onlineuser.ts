import Mock from 'mockjs';
import request from '../../request/axios';

const userList = Mock.mock(
  {
    'data|10-20': [
      {
        // 用户系统
        'system|1': [
          'window',
          'mac',
        ],
        // ip地址
        IP: '@ip()',
        // 状态
        'status|1': [
          1,
          2,
        ],
        // 访问次数
        'time|1-50': 1,
      },
    ],
  },
);

Mock.mock('/monitor/onlineuser', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: userList,
  }
));

// 登录
export default function getonlineuser() {
  return request({
    url: '/monitor/onlineuser',
    method: 'get',
  });
}
