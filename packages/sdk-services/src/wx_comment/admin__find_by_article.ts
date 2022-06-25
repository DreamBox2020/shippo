import { IWxCommentExtReplyList } from '@shippo/types'
import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  articleId: number
}

interface IResponseResource extends Array<IWxCommentExtReplyList> {}

export const admin__find_by_article = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxComment/admin/findByArticle',
    method: 'POST',
    data,
  })
