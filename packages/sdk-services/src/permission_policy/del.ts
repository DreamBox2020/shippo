import { createAPI } from '../helpers'

interface IRequestResource {
  id: number
}

interface IResponseResource {}

export const del = createAPI<IRequestResource, IResponseResource>({
  url: '/permissionPolicy/del',
  method: 'POST',
})
