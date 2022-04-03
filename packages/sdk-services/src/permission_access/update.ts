import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  id: number
  accessRule: string
  remark: string
  accessType: string
}

interface IResponseResource {}

export const update = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/permissionAccess/update',
    method: 'POST',
    data,
  })
