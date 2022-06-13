import { IPermissionAccess } from '../types'
import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  wxCode?: string
}

interface IResponseResource {
  passport: string
  uid: number
  access: IPermissionAccess[]
}

export const create = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/passport/create',
    method: 'POST',
    data,
  })
