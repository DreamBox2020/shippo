import { IPagination, IUserExtRoleName } from '@shippo/types'
import { createAPI } from '../helpers'

interface IRequestResource extends Partial<IPagination> {
  id?: number
  phone?: string
  email?: string
  nickname?: string
}

interface IResponseResource extends Required<IPagination> {
  items: IUserExtRoleName[]
}

export const find_all = createAPI<IRequestResource, IResponseResource>({
  url: '/user/findAll',
  method: 'POST',
})
