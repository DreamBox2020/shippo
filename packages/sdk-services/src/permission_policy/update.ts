import { createAPI } from '../helpers'

interface IRequestResource {
  id: number
  policyName: string
  remark: string
}

interface IResponseResource {}

export const update = createAPI<IRequestResource, IResponseResource>({
  url: '/permissionPolicy/update',
  method: 'POST',
})
