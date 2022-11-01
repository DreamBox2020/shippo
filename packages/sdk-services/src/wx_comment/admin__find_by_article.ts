import { IWxCommentExtReplyList } from '@shippo/types'
import { createAPI } from '../helpers'

interface IRequestResource {
  articleId: number
}

interface IResponseResource extends Array<IWxCommentExtReplyList> {}

export const admin__find_by_article = createAPI<
  IRequestResource,
  IResponseResource
>({
  url: '/wxComment/admin/findByArticle',
  method: 'POST',
})
