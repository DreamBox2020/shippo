import { createAPI } from '../helpers'

interface IRequestResource {
  email?: string
}

interface IResponseResource {}

export const create = createAPI<IRequestResource, IResponseResource>({
  url: '/user/create',
  method: 'POST',
})
