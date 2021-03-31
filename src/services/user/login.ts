import { request, ResponsePack } from '..'

interface IRequestResource {
  phone: string
  code: string
}

interface IResponseResource {
  passport: string
  uid: number
}

export const login = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/user/login',
    method: 'POST',
    data,
  })
