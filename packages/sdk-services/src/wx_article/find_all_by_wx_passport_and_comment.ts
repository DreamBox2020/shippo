import { request, ResponsePack } from '../helpers'
import { IWxArticleExtOffiaccountNickname } from '@shippo/types'

interface IResponseResource extends Array<IWxArticleExtOffiaccountNickname> {}

export const find_all_by_wx_passport_and_comment = () =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxArticle/findAllByWxPassportAndComment',
    method: 'POST',
    data: {},
  })
