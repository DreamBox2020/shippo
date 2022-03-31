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
