import { createSlice } from '../helpers'
import { IUserInfo, __userInfo } from '@shippo/sdk-types'
export const createDefaultInfo = __userInfo

export interface IUserState {
  info: IUserInfo
}

export const userSlice = createSlice<IUserState>('user', {
  info: createDefaultInfo(),
})

export const action = userSlice.action
