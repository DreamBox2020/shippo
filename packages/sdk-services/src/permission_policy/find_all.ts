import { IPermissionPolicy } from '../types'
import { request, ResponsePack } from '../helpers'

interface IResponseResource extends Array<IPermissionPolicy & { roleAssociationCount: number }> {}

export const find_all = () =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/permissionPolicy/findAll',
    method: 'POST',
  })
