import { createAPI } from '../helpers'

interface IRequestResource {
  accessRule: string
  remark: string
  accessType: string
}

interface IResponseResource {}

export const create = createAPI<IRequestResource, IResponseResource>({
  url: '/permissionAccess/create',
  method: 'POST',
})
