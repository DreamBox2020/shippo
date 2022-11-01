import { createAPI } from '../helpers'

interface IRequestResource {
  id: number
  access: number[]
}

interface IResponseResource {}

export const update_access = createAPI<IRequestResource, IResponseResource>({
  url: '/permissionPolicy/updateAccess',
  method: 'POST',
})
