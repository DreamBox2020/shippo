import { IWxComment } from '@shippo/types'
import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  content: string
  replyCommentId: number
}

interface IResponseResource extends IWxComment {}

export const admin__reply = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxComment/admin/reply',
    method: 'POST',
    data
  })
