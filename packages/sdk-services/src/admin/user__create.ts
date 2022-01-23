import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  email?: string
}

export const user__create = (data: IRequestResource) =>
  request.request<ResponsePack>({
    url: '/admin/user/create',
    method: 'POST',
    data,
  })
