import { IPermissionPolicy } from '@shippo/types'
import { createAPI } from '../helpers'

interface IRequestResource {
  id: number
}

interface IResponseResource
  extends Array<IPermissionPolicy & { status: boolean }> {}

export const find_all_ext_status = createAPI<
  IRequestResource,
  IResponseResource
>({
  url: '/permissionPolicy/findAllExtStatus',
  method: 'POST',
})
