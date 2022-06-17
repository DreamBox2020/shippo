import { request, ResponsePack } from '../helpers'
import { IWxArticleExtOffiaccountNickname } from '../types'

interface IResponseResource extends Array<IWxArticleExtOffiaccountNickname> {}

export const find_all_by_wx_passport = () =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxArticle/findAllByWxPassport',
    method: 'POST',
    data: {},
  })
