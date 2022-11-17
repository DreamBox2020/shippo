import { createAPI } from '../helpers'

interface IRequestResource {
  id: number
  roleName: string
  remark: string
}

interface IResponseResource {}

export const update = createAPI<IRequestResource, IResponseResource>({
  url: '/role/update',
  method: 'POST',
})
