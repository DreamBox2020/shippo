import { createAPI } from '../helpers'

interface IRequestResource {
  code: string
}

interface IResponseResource {}

export const update_info = createAPI<IRequestResource, IResponseResource>({
  url: '/wxPassport/updateInfo',
  method: 'POST',
})
