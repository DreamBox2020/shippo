import { createAPI } from '../helpers'

interface IRequestResource {
  id: number
  isElected: number
}

interface IResponseResource {}

export const update_elected = createAPI<IRequestResource, IResponseResource>({
  url: '/wxComment/updateElected',
  method: 'POST',
})
