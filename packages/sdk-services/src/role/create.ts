import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  roleName: string
  remark: string
}

interface IResponseResource {}

export const create = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/role/create',
    method: 'POST',
    data,
  })
