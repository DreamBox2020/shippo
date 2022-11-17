import { createAPI } from '../helpers'
import { IWxArticleExtOffiaccountNickname } from '@shippo/types'

interface IRequestResource {
  id: number
}

interface IResponseResource extends IWxArticleExtOffiaccountNickname {}

export const find = createAPI<IRequestResource, IResponseResource>({
  url: '/wxArticle/find',
  method: 'POST',
})
