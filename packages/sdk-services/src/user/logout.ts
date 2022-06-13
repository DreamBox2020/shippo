import { IPermissionAccess } from '../types'
import { request, ResponsePack } from '../helpers'

interface IResponseResource {
  passport: string
  uid: number
  access: IPermissionAccess[]
}

export const logout = () =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/user/logout',
    method: 'POST',
    data: {},
  })
