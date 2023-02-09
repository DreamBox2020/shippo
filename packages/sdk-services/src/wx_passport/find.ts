import { createAPI } from '../helpers'
import { IWxPassport } from '@shippo/sdk-types'

interface IResponseResource extends IWxPassport {}

export const find = createAPI<void, IResponseResource>({
  url: '/wxPassport/find',
  method: 'POST',
})
