import { IUserInfo } from '@shippo/types'
import { createAPI } from '../helpers'

interface IResponseResource extends IUserInfo {}

export const logout = createAPI<void, IResponseResource>({
  url: '/user/logout',
  method: 'POST',
})
