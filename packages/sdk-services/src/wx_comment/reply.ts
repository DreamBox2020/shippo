import { IWxComment } from '@shippo/types'
import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  content: string
  replyCommentId: number
}

interface IResponseResource extends IWxComment {}

export const reply = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxComment/reply',
    method: 'POST',
    data
  })
