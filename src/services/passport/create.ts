import { request, ResponsePack } from '..'

export interface IResponseResource {
  passport: string
  uid: number
}

export const create = () =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/passport/create',
    method: 'POST',
    data: {},
  })
