import { IPermissionAccess } from '@shippo/sdk-types'
import { createAPI } from '../helpers'

interface IRequestResource {
  id: number
}

interface IResponseResource
  extends Array<IPermissionAccess & { status: boolean }> {}

export const find_all_ext_status = createAPI<
  IRequestResource,
  IResponseResource
>({
  url: '/permissionAccess/findAllExtStatus',
  method: 'POST',
})
