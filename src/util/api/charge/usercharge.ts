import { logintype } from '@/util/type/requesrtype';
import Mock from 'mockjs';
import request from '../../request/axios';

const userList = Mock.mock(
  {
    'data|5-10': [
      {
        // 用户名称
        username: '@name()',
        // 用户昵称
        name: '@cname()',
        // 部门
        part: '@cword(3, 5)',
        // 邮箱
        email: '@email()',
        // 状态
        'status|1-2': 1,
        // 创建时间
        time: '@datetime("yyyy-MM-dd HH:mm:ss")',
      },
    ],
  },
);

Mock.mock('/user/usercharge', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: userList,
  }
));

// 登录
export default function getuser() {
  return request({
    url: '/user/usercharge',
    method: 'get',
  });
}
