import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  id: number
  policyName: string
  remark: string
}

interface IResponseResource {}

export const update = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/permissionPolicy/update',
    method: 'POST',
    data,
  })
