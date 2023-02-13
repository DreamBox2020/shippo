import { createAPI } from '../helpers'

interface IRequestResource {
  qq: string
  phone: string
}

interface IResponseResource
  extends Array<{
    tradeId: string
    name: string
    qq: string
    phone: string
    addr: string
  }> {}

export const temp_express_20220914__findByQQAndPhone = createAPI<
  IRequestResource,
  IResponseResource
>({
  url: '/temp/temp_express_20220914/findByQQAndPhone',
  method: 'POST',
})
