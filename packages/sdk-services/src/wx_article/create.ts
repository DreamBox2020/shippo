import { createAPI } from '../helpers'
import { IWxArticle } from '@shippo/sdk-types'

interface IRequestResource {
  url: string
}

interface IResponseResource extends IWxArticle {}

export const create = createAPI<IRequestResource, IResponseResource>({
  url: '/wxArticle/create',
  method: 'POST',
})
