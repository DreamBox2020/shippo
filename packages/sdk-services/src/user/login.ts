import { IUserInfo } from '@shippo/types'
import { createAPI } from '../helpers'

interface IRequestResource {
  phone?: string
  email?: string
  code: string
}

interface IResponseResource extends IUserInfo {}

export const login = createAPI<IRequestResource, IResponseResource>({
  url: '/user/login',
  method: 'POST',
})
