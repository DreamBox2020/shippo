import { createAPI } from '../helpers'

interface IRequestResource {
  id: number
  role: number
}

interface IResponseResource {}

export const update_user_role = createAPI<IRequestResource, IResponseResource>({
  url: '/user/updateUserRole',
  method: 'POST',
})
