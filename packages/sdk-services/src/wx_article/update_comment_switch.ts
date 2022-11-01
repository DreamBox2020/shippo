import { createAPI } from '../helpers'

interface IRequestResource {
  id: number
  commentSwitch: number
}

interface IResponseResource {}

export const update_comment_switch = createAPI<
  IRequestResource,
  IResponseResource
>({
  url: '/wxArticle/updateCommentSwitch',
  method: 'POST',
})
