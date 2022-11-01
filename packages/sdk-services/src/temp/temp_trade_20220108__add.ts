import { createAPI } from '../helpers'

interface IRequestResource {
  trade1: string
  trade2: string
  qq: string
  phone: string
}

interface IResponseResource {}

export const temp_trade_20220108__add = createAPI<
  IRequestResource,
  IResponseResource
>({
  url: '/temp/temp_trade_20220108/add',
  method: 'POST',
})
