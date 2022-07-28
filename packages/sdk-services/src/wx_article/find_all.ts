import { request, ResponsePack } from '../helpers'
import { IWxArticleExtOffiaccountNickname } from '@shippo/types'

interface IResponseResource extends Array<IWxArticleExtOffiaccountNickname> {}

export const find_all = () =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxArticle/findAll',
    method: 'POST',
    data: {},
  })
