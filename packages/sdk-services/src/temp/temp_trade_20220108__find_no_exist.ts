import { createAPI } from '../helpers'

interface IRequestResource {
  list: string[]
}

interface IResponseResource extends Array<string> {}

export const temp_trade_20220108__find_no_exist = createAPI<
  IRequestResource,
  IResponseResource
>({
  url: '/temp/temp_trade_20220108/findNoExist',
  method: 'POST',
})
