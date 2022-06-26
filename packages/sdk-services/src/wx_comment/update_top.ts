import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  id: string
  isTop: number
}

interface IResponseResource {}

export const update_top = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxComment/updateTop',
    method: 'POST',
    data,
  })
