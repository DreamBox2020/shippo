import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  phone?: string
  email?: string
}

export const send = (data: IRequestResource) =>
  request.request<ResponsePack>({
    url: '/captcha/send',
    method: 'POST',
    data,
  })
