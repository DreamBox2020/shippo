import { IPermissionAccess } from '@shippo/types'
import { request, ResponsePack } from '../helpers'

interface IResponseResource extends Array<IPermissionAccess & { roleAssociationCount: number }> {}

export const find_all = () =>
  request.request<ResponsePack<IResponseResource>>({
    url: '/permissionAccess/findAll',
    method: 'POST',
  })
