import { IWxComment } from '@shippo/sdk-types'
import { createAPI } from '../helpers'

interface IRequestResource {
  content: string
  replyCommentId: number
}

interface IResponseResource extends IWxComment {}

export const reply = createAPI<IRequestResource, IResponseResource>({
  url: '/wxComment/reply',
  method: 'POST',
})
