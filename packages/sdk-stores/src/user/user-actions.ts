import { IUserInfo } from '@shippo/sdk-types'
import { action } from './user-slice'

export const userUpdateInfo = action((info: IUserInfo) => ({ info }))
