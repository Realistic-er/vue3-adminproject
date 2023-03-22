import { logintype } from '@/util/type/requesrtype';
import Mock from 'mockjs';
import request from '../../request/axios';

const partList = Mock.mock(
  {
    'data|2': [
      {
        // 部门名称
        partname: '@name()',
        // 权限字符
        partstring: '@cname()',
        // 排序
        'sort|1-100': 1,
        // 状态
        'status|1': [
          '1',
          '2',
        ],
        // 上级部门
        'forwardpart|1': [
          '后台管理系统', '北京总公司', '研发部门', '市场部门',
          '测试部门', '财务部门', '运维部门', '上海分公司',
        ],
        // 负责人
        personcharge: '@name()',
        // 邮箱
        email: '@email()',
        // 手机号码
        'phone|1-100': 1,
        // 创建时间
        time: '@datetime("yyyy-MM-dd HH:mm:ss")',
        // id
        id: '@id',
        'children|2': [
          {
            // 部门名称
            partname: '@name()',
            // 权限字符
            partstring: '@cname()',
            // 排序
            'sort|1-100': 1,
            // 状态
            'status|1': [
              '1',
              '2',
            ],
            // 上级部门
            'forwardpart|1': [
              '后台管理系统', '北京总公司', '研发部门', '市场部门',
              '测试部门', '财务部门', '运维部门', '上海分公司',
            ],
            // 负责人
            personcharge: '@name()',
            // 邮箱
            email: '@email()',
            // 手机号码
            'phone|1-100': 1,
            // 创建时间
            time: '@datetime("yyyy-MM-dd HH:mm:ss")',
            // id
            id: '@id',
            'children|5-10': [
              {
                // 部门名称
                partname: '@name()',
                // 权限字符
                partstring: '@cname()',
                // 排序
                'sort|1-100': 1,
                // 状态
                'status|1': [
                  '1',
                  '2',
                ],
                // 上级部门
                'forwardpart|1': [
                  '后台管理系统', '北京总公司', '研发部门', '市场部门',
                  '测试部门', '财务部门', '运维部门', '上海分公司',
                ],
                // 负责人
                personcharge: '@name()',
                // 邮箱
                email: '@email()',
                // 手机号码
                'phone|1-100': 1,
                // 创建时间
                time: '@datetime("yyyy-MM-dd HH:mm:ss")',
                // id
                id: '@id',
              },
            ],
          },
        ],
      },
    ],
  },
);

Mock.mock('/part/partcharge', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: partList,
  }
));

// 登录
export default function getpart() {
  return request({
    url: '/part/partcharge',
    method: 'get',
  });
}
