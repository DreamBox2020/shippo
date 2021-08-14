import { createReducer } from '@kazura/react-store'

export interface IUserStore {
  info: { uid: number }
}

export const userReducer = createReducer<IUserStore>('user', {
  info: { uid: 0 },
})
