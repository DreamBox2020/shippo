import { createReducer } from '@kazura/react-store'
import { IUserInfo, __userInfo } from '@shippo/types'

export const createDefaultInfo = __userInfo

export interface IUserStore {
  info: IUserInfo
}

export const userReducer = createReducer<IUserStore>('user', {
  info: createDefaultInfo(),
})
