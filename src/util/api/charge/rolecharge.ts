import { logintype } from '@/util/type/requesrtype';
import Mock from 'mockjs';
import request from '../../request/axios';

const roleList = Mock.mock(
  {
    'data|10-15': [
      {
        // 角色名称
        rolename: '@name()',
        // 权限字符
        rolestring: '@cname()',
        // 显示顺序
        'sort|1-100': 1,
        // 状态
        'status|1': [
          '1',
          '2',
        ],
        // 菜单权限
        menurole: '@name()',
        // 创建时间
        time: '@datetime("yyyy-MM-dd HH:mm:ss")',
        // 备注
        text: '@cparagraph(1, 3)',
      },
    ],
  },
);

Mock.mock('/role/rolecharge', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: roleList,
  }
));

// 登录
export default function getrole() {
  return request({
    url: '/role/rolecharge',
    method: 'get',
  });
}
