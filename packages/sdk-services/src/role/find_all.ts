import { IRole } from '@shippo/sdk-types'
import { createAPI } from '../helpers'

interface IResponseResource extends Array<IRole> {}

export const find_all = createAPI<void, IResponseResource>({
  url: '/role/findAll',
  method: 'POST',
})
