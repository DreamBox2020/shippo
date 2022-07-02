import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserInfo, __userInfo } from '@shippo/types'
export const createDefaultInfo = __userInfo

export interface IUserStore {
  info: IUserInfo
}

const initialState: IUserStore = {
  info: createDefaultInfo()
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userUpdateInfo: (state, action: PayloadAction<IUserStore['info']>) => {
      state.info = action.payload
    }
  }
})

export const userActions = userSlice.actions
export * as userGetters from './user-getters'
