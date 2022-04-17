export interface IRole {
  id: number
  createdAt: string
  roleName: string
  remark: string
}

export const __role = (): IRole => ({
  id: 0,
  createdAt: '',
  roleName: '',
  remark: '',
})

export interface IPermissionPolicy {
  id: number
  createdAt: string
  policyName: string
  remark: string
}

export const __permissionPolicy = (): IPermissionPolicy => ({
  id: 0,
  createdAt: '',
  policyName: '',
  remark: '',
})

export interface IPermissionAccess {
  id: number
  createdAt: string
  accessRule: string
  remark: string
  accessType: string
}

export const __permissionAccess = (): IPermissionAccess => ({
  id: 0,
  createdAt: '',
  accessRule: '',
  remark: '',
  accessType: '',
})

export interface IUser {
  id: number
  createdAt: string
  phone: string
  email: string
  nickname: string
  avatar: string
  exp: number
  coin: number
  role: number
}

export const __user = (): IUser => ({
  id: 0,
  createdAt: '',
  phone: '',
  email: '',
  nickname: '',
  avatar: '',
  exp: 0,
  coin: 0,
  role: 0,
})

export interface IPagination {
  current: number
  pageSize: number
  total: number
}

export interface IUserExtRoleName extends IUser {
  roleName: string
}

export const __userExtRoleName = (): IUserExtRoleName => ({
  ...__user(),
  roleName: '',
})
