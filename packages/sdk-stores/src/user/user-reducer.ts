import { createReducer } from '@kazura/react-store'
import { IPermissionAccess } from '@shippo/sdk-services'

export const createDefaultInfo = () => ({
  uid: 0,
  access: [],
})

export interface IUserStore {
  info: { uid: number; access: IPermissionAccess[] }
}

export const userReducer = createReducer<IUserStore>('user', {
  info: createDefaultInfo(),
})
