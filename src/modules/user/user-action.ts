import { createAction } from '@kazura/react-store'
import { IUserStore } from './user-reducer'

const action = createAction<IUserStore>('example')

export const userUpdateInfo = action((info: { uid: number }) => ({ info }))
