import { logintype } from '@/util/type/requesrtype';
import Mock from 'mockjs';
import request from '../../request/axios';

const userList = Mock.mock(
  {
    'data|10-20': [
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
        'status|1': [
          '1',
          '2',
        ],
        // 创建时间
        time: '@datetime("yyyy-MM-dd HH:mm:ss")',
        // 手机号码
        'phone|1-100': 1,
        // 用户密码
        password: '123456',
        // 用户性别
        'sex|1': [
          '男',
          '女',
        ],
        // 岗位
        job: '@cword(3, 5)',
        // 角色
        'role|1': [
          '董事长',
          '普通员工',
        ],
        // 备注
        text: '@cparagraph(1, 3)',
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
