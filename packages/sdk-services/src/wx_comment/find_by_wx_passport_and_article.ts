import { IWxCommentExtReplyList } from '@shippo/types'
import { createAPI } from '../helpers'

interface IRequestResource {
  articleId: number
}

interface IResponseResource extends Array<IWxCommentExtReplyList> {}

export const find_by_wx_passport_and_article = createAPI<
  IRequestResource,
  IResponseResource
>({
  url: '/wxComment/findByWxPassportAndArticle',
  method: 'POST',
})
