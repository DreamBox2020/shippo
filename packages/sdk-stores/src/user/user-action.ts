import { createAction } from '@kazura/react-store'
import { IUserStore } from './user-reducer'

const action = createAction<IUserStore>('user')

export const userUpdateInfo = action((info: IUserStore['info']) => ({ info }))
