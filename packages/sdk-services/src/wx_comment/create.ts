import { IWxComment } from '@shippo/sdk-types'
import { createAPI } from '../helpers'

interface IRequestResource {
  content: string
  articleId: number
}

interface IResponseResource extends IWxComment {}

export const create = createAPI<IRequestResource, IResponseResource>({
  url: '/wxComment/create',
  method: 'POST',
})
