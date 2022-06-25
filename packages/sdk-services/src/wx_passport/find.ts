import { request, ResponsePack } from '../helpers'
import { IWxPassport } from '@shippo/types'

interface IResponseResource extends IWxPassport {}

export const find = () =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxPassport/find',
    method: 'POST',
    data: {},
  })
