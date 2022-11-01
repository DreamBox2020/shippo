import { createAPI } from '../helpers'

interface IRequestResource {
  roleName: string
  remark: string
}

interface IResponseResource {}

export const create = createAPI<IRequestResource, IResponseResource>({
  url: '/role/create',
  method: 'POST',
})
