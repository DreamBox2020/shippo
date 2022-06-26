import { request, ResponsePack } from '../helpers'
import { IWxArticle } from '@shippo/types'

interface IRequestResource {
  id: number
  url: string
}

interface IResponseResource extends IWxArticle {}

export const update = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxArticle/update',
    method: 'POST',
    data,
  })
