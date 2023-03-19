export type logintype = {
  username: string,
  password: string,
}

export type userlist = {
  // 用户名称
  username: string,
  // 用户昵称
  name: string,
  // 部门
  part: string,
  // 邮箱
  email: string,
  // 状态
  'status|1-2': number,
  // 创建时间
  time: string,
}
