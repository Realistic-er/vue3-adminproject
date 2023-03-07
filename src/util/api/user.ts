import { logintype } from '@/util/type/requesrtype';
import Mock from 'mockjs';
import request from '../request/axios';

const userList = {
  data: {
    total: 3,
    userinfo: [{
      username: 'admin',
      password: '123456',
      roles: 'admin',
      token: '@guid()',
      id: '100',
    }, {
      username: 'staff',
      password: '123456',
      roles: 'staff',
      token: '@guid()',
      id: '101',
    }, {
      username: 'visit',
      password: '123456',
      roles: 'visit',
      token: '@guid()',
      id: '102',
    },
    ],
    meta: {
      status: 200,
      message: 'success',
    },
  },
};

Mock.mock('/user/loginin', 'post', (req:any) => {
  const { username, password } = JSON.parse(req.body);
  for (let i = 0; i < userList.data.userinfo.length; i += 1) {
    if (username === userList.data.userinfo[i].username
    && password === userList.data.userinfo[i].password) {
      return {
        meta: {
          msg: 'success',
          status: 200,
        },
        user: {
          username: userList.data.userinfo[i].username,
          roles: userList.data.userinfo[i].roles,
        },
      };
    }
  }
  return {
    meta: {
      msg: 'error',
      status: 201,
    },
  };
});

// 登录
export default function loginin(data:logintype) {
  return request({
    url: '/user/loginin',
    method: 'post',
    data,
  });
}
