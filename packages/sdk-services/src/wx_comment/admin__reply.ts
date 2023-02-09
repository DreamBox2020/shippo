import { IWxComment } from '@shippo/sdk-types'
import { createAPI } from '../helpers'

interface IRequestResource {
  content: string
  replyCommentId: number
}

interface IResponseResource extends IWxComment {}

export const admin__reply = createAPI<IRequestResource, IResponseResource>({
  url: '/wxComment/admin/reply',
  method: 'POST',
})
