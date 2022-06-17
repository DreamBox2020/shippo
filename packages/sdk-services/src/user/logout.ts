import { IUserInfo } from '../types'
import { request, ResponsePack } from '../helpers'

interface IResponseResource extends IUserInfo {}

export const logout = () =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/user/logout',
    method: 'POST',
    data: {},
  })
