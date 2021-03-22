import { UserActionTypeEnum, userStore, IUserStore, userActionTypes } from '.'

const userReducerHander = {
  [UserActionTypeEnum.USER_UPDATE_INFO]: (
    store: IUserStore,
    payload: { uid: number }
  ): IUserStore => {
    return { ...store, info: payload }
  },
}

export const userReducer = (store = userStore, action: userActionTypes) => {
  switch (action.type) {
    case UserActionTypeEnum.USER_UPDATE_INFO:
      return userReducerHander[action.type](store, action.payload)
    default:
      return store || {}
  }
}
