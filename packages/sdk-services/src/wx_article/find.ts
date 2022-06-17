import { request, ResponsePack } from '../helpers'
import { IWxArticleExtOffiaccountNickname } from '../types'

interface IRequestResource {
  id: number
}

interface IResponseResource extends IWxArticleExtOffiaccountNickname {}

export const find = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxArticle/find',
    method: 'POST',
    data,
  })
