import { createAPI } from '../helpers'

interface IRequestResource {
  policyName: string
  remark: string
}

interface IResponseResource {}

export const create = createAPI<IRequestResource, IResponseResource>({
  url: '/permissionPolicy/create',
  method: 'POST',
})
