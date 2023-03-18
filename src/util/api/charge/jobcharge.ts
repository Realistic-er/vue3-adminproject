import { logintype } from '@/util/type/requesrtype';
import Mock from 'mockjs';
import request from '../../request/axios';

type paratype = {
  currentPage: number,
  pageSize: number,
}
const jobList = Mock.mock(
  {
    'data|5-10': [
      {
        code: '@cname()',
        name: '@name()',
        'sort|1-50': 1,
        'status|1-2': 1,
        time: '@datetime("yyyy-MM-dd HH:mm:ss")',
      },
    ],
  },
);

Mock.mock('/charge/jobcharge', 'get', () => (
  {
    meta: {
      msg: 'success',
      status: 200,
    },
    data: jobList,
  }
));

// 登录
export default function getjobcharge() {
  return request({
    url: '/charge/jobcharge',
    method: 'get',
  });
}
