import { IWxComment } from '@shippo/types'
import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  content: string
  articleId: number
}

interface IResponseResource extends IWxComment {}

export const create = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxComment/create',
    method: 'POST',
    data,
  })
