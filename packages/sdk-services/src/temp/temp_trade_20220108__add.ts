import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  trade1: string
  trade2: string
  qq: string
  phone: string
}

export const temp_trade_20220108__add = (data: IRequestResource) =>
  request.request<ResponsePack>({
    url: '/temp/temp_trade_20220108/add',
    method: 'POST',
    data,
  })
