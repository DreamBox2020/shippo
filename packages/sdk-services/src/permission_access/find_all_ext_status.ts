import { IPermissionAccess } from '../types'
import { request, ResponsePack } from '../helpers'

interface IRequestResource {
  id: number
}

interface IResponseResource extends Array<IPermissionAccess & { status: boolean }> {}

export const find_all_ext_status = (data: IRequestResource) =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/permissionAccess/findAllExtStatus',
    method: 'POST',
    data,
  })
