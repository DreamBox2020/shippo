import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  id: number
  isElected: number
}

interface IResponseResource {}

export const update_elected = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/wxComment/updateElected',
    method: 'POST',
    data
  })
