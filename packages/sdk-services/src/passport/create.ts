import { IUserInfo } from '@shippo/types'
import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  wxCode?: string
}

interface IResponseResource extends IUserInfo {}

export const create = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/passport/create',
    method: 'POST',
    data,
  })
