import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  id: string
}

interface IResponseResource {}

export const del = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxComment/del',
    method: 'POST',
    data,
  })
