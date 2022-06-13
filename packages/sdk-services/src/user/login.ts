import { IPermissionAccess } from '../types'
import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  phone?: string
  email?: string
  code: string
}

interface IResponseResource {
  passport: string
  uid: number
  access: IPermissionAccess[]
}

export const login = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/user/login',
    method: 'POST',
    data,
  })
