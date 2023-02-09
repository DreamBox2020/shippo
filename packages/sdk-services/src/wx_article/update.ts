import { createAPI } from '../helpers'
import { IWxArticle } from '@shippo/sdk-types'

interface IRequestResource {
  id: number
  url: string
}

interface IResponseResource extends IWxArticle {}

export const update = createAPI<IRequestResource, IResponseResource>({
  url: '/wxArticle/update',
  method: 'POST',
})
