import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  id: number
  policies: number[]
}

interface IResponseResource {}

export const update_policies = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/role/updatePolicies',
    method: 'POST',
    data,
  })
