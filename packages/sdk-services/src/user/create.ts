import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  email?: string
}

export const create = (data: IRequestResource) =>
  request.request<ResponsePack>({
    url: '/user/create',
    method: 'POST',
    data,
  })
