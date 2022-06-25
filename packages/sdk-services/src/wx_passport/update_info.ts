import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  code: string
}

interface IResponseResource {}

export const update_info = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxPassport/updateInfo',
    method: 'POST',
    data,
  })
