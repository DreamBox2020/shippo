import { IRole } from '@shippo/types'
import { request, ResponsePack } from '../helpers'

interface IResponseResource extends Array<IRole> {}

export const find_all = () =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/role/findAll',
    method: 'POST',
  })
