import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  qq: string
}

interface IResponseResource
  extends Array<{
    id: string
    type: number
    amount: number
    status: number
    qq: string
    phone: string
    time: string
  }> {}

export const temp_trade_20220108__find = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/temp/temp_trade_20220108/find',
    method: 'POST',
    data,
  })
