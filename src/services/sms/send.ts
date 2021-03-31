import { request, ResponsePack } from '..'

interface IRequestResource {
  phone: string
}

export const send = (data: IRequestResource) =>
  request.request<ResponsePack>({
    url: '/sms/send',
    method: 'POST',
    data,
  })
