import { UserActionTypeEnum } from '.'

export type userActionTypes = {
  type: UserActionTypeEnum.USER_UPDATE_INFO
  payload: { uid: number }
}

export const userAction = {
  userUpdateInfo: (info: { uid: number }) => {
    return {
      type: UserActionTypeEnum.USER_UPDATE_INFO,
      payload: info,
    }
  },
}
