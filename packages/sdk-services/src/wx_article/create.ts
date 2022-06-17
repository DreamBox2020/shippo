import { request, ResponsePack } from '../helpers'
import { IWxArticle } from '../types'

interface IRequestResource {
  url: string
}

interface IResponseResource extends IWxArticle {}

export const create = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxArticle/create',
    method: 'POST',
    data,
  })
