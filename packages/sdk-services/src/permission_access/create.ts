import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  accessRule: string
  remark: string
  accessType: string
}

interface IResponseResource {}

export const create = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/permissionAccess/create',
    method: 'POST',
    data,
  })
