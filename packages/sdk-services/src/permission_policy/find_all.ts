import { IPermissionPolicy } from '@shippo/types'
import { createAPI } from '../helpers'

interface IResponseResource
  extends Array<IPermissionPolicy & { roleAssociationCount: number }> {}

export const find_all = createAPI<void, IResponseResource>({
  url: '/permissionPolicy/findAll',
  method: 'POST',
})
