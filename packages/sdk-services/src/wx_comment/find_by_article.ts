import { IWxCommentExtReplyList } from '@shippo/types'
import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  articleId: number
}

interface IResponseResource extends Array<IWxCommentExtReplyList> {}

export const find_by_article = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxComment/findByArticle',
    method: 'POST',
    data,
  })
