import { request, ResponsePack } from '../helpers'

interface IResponseResource {
  passport: string
  uid: number
}

export const create = () =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/passport/create',
    method: 'POST',
    data: {},
  })
