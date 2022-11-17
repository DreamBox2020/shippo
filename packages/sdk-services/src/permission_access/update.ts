import { createAPI } from '../helpers'

interface IRequestResource {
  id: number
  accessRule: string
  remark: string
  accessType: string
}

interface IResponseResource {}

export const update = createAPI<IRequestResource, IResponseResource>({
  url: '/permissionAccess/update',
  method: 'POST',
})
