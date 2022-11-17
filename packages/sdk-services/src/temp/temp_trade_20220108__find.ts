import { createAPI } from '../helpers'

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

export const temp_trade_20220108__find = createAPI<
  IRequestResource,
  IResponseResource
>({
  url: '/temp/temp_trade_20220108/find',
  method: 'POST',
})
