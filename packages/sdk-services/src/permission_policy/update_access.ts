import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  id: number
  access: number[]
}

interface IResponseResource {}

export const update_access = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/permissionPolicy/updateAccess',
    method: 'POST',
    data,
  })
