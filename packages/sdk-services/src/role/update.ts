import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  id: number
  roleName: string
  remark: string
}

interface IResponseResource {}

export const update = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/role/update',
    method: 'POST',
    data,
  })
