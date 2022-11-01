import { createAPI } from '../helpers'
import { IWxPassport } from '@shippo/types'

interface IResponseResource extends IWxPassport {}

export const find = createAPI<void, IResponseResource>({
  url: '/wxPassport/find',
  method: 'POST',
})
