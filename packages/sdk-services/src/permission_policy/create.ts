import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  policyName: string
  remark: string
}

interface IResponseResource {}

export const create = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/permissionPolicy/create',
    method: 'POST',
    data,
  })
