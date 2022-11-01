import { createAPI } from '../helpers'

interface IRequestResource {
  id: number
  isTop: number
}

interface IResponseResource {}

export const update_top = createAPI<IRequestResource, IResponseResource>({
  url: '/wxComment/updateTop',
  method: 'POST',
})
