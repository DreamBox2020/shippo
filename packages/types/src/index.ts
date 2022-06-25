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
  wxPassportId: number
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
  wxPassportId: 0,
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

export interface IWxArticle {
  id: number
  createdAt: string
  title: string
  url: string
  image1: string
  image2: string
  commentSwitch: number
  offiaccountId: number
  wxPassportId: number
}

export const __wxArticle = (): IWxArticle => ({
  id: 0,
  createdAt: '',
  title: '',
  url: '',
  image1: '',
  image2: '',
  commentSwitch: 0,
  offiaccountId: 0,
  wxPassportId: 0,
})

export interface IWxArticleExtOffiaccountNickname extends IWxArticle {
  offiaccountNickname: string
}

export const __wxArticleExtOffiaccountNickname = (): IWxArticleExtOffiaccountNickname => ({
  ...__wxArticle(),
  offiaccountNickname: '',
})

export interface IPassport {
  id: number
  createdAt: string
  token: string
  userId: number
  ip: string
  ua: string
  client: number
  wxPassportId: number
}

export const __passport = (): IPassport => ({
  id: 0,
  createdAt: '',
  token: '',
  userId: 0,
  ip: '',
  ua: '',
  client: 0,
  wxPassportId: 0,
})

export interface IUserInfo {
  access: Array<IPermissionAccess>
  user: IUser
  passport: string
  uid: number
}

export const __userInfo = (): IUserInfo => ({
  access: [],
  user: __user(),
  passport: '',
  uid: 0,
})

export interface IWxComment {
  id: number
  createdAt: string
  content: string
  articleId: number
  wxPassportId: number
  likeNum: number
  isElected: number
  isTop: number
  replyCommentId: number
}

export const __wxComment = (): IWxComment => ({
  id: 0,
  createdAt: '',
  content: '',
  articleId: 0,
  wxPassportId: 0,
  likeNum: 0,
  isElected: 0,
  isTop: 0,
  replyCommentId: 0,
})
