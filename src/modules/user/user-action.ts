import { createAction } from '../util'
import { IUserStore } from './user-store'

const action = createAction<IUserStore>('example')

export const userAction = {
  userUpdateInfo: action((info: { uid: number }) => ({ info })),
}
