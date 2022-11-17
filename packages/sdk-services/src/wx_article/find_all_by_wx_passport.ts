import { createAPI } from '../helpers'
import { IWxArticleExtOffiaccountNickname } from '@shippo/types'

interface IResponseResource extends Array<IWxArticleExtOffiaccountNickname> {}

export const find_all_by_wx_passport = createAPI<void, IResponseResource>({
  url: '/wxArticle/findAllByWxPassport',
  method: 'POST',
})
