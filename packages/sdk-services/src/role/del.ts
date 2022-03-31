import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  id: number
}

interface IResponseResource {}

export const del = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/role/del',
    method: 'POST',
    data,
  })
