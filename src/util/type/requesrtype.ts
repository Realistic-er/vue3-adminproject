export type logintype = {
  username: string,
  password: string,
}

export type userlist = {
  username: string,
  name: string,
  part: string,
  email: string,
  status: string,
  time: string,
  phone: string,
  password: string,
  sex: string,
  job: string,
  role: string,
  text: string,
}

export type roleList = {
  rolename: string,
  rolestring: string,
  sort: number,
  email: string,
  status: string,
  menurole: string,
  text: string,
}

export type parttype = {
  label: string,
  sort: number,
  status: string,
  time: string,
  id: string,
  children: [
    {
      label: string,
      sort: number,
      status: string,
      time: string,
      id: string,
      children: [
        {
          label: string,
          sort: number,
          status: string,
          time: string,
          id: string,
        }
      ]
    }
  ]
}

export type part = {
  label: string,
  sort: number,
  status: string,
  time: string,
  id: string,
}
