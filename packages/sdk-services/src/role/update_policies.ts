import { createAPI } from '../helpers'

interface IRequestResource {
  id: number
  policies: number[]
}

interface IResponseResource {}

export const update_policies = createAPI<IRequestResource, IResponseResource>({
  url: '/role/updatePolicies',
  method: 'POST',
})
