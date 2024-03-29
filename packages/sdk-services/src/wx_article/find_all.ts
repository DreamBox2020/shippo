import { createAPI } from '../helpers'
import { IWxArticleExtOffiaccountNickname } from '@shippo/sdk-types'

interface IResponseResource extends Array<IWxArticleExtOffiaccountNickname> {}

export const find_all = createAPI<void, IResponseResource>({
  url: '/wxArticle/findAll',
  method: 'POST',
})
