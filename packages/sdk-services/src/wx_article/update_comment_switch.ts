import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  id: number
  commentSwitch: number
}

interface IResponseResource {}

export const update_comment_switch = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxArticle/updateCommentSwitch',
    method: 'POST',
    data,
  })
