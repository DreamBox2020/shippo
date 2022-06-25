import { IUserInfo } from '@shippo/types'
import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  phone?: string
  email?: string
  code: string
}

interface IResponseResource extends IUserInfo {}

export const login = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/user/login',
    method: 'POST',
    data,
  })
