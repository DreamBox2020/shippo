import { IPermissionPolicy } from '@shippo/sdk-types'
import { createAPI } from '../helpers'

interface IResponseResource
  extends Array<IPermissionPolicy & { roleAssociationCount: number }> {}

export const find_all = createAPI<void, IResponseResource>({
  url: '/permissionPolicy/findAll',
  method: 'POST',
})
