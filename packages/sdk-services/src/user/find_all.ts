import { IPagination, IUserExtRoleName } from '../types'
import { request, ResponsePack } from '../helpers'

interface IRequestResource extends Partial<IPagination> {
  id?: number
  phone?: string
  email?: string
  nickname?: string
}

interface IResponseResource extends Required<IPagination> {
  items: IUserExtRoleName[]
}

export const find_all = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/user/findAll',
    method: 'POST',
    data,
  })
