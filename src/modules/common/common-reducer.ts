import { CommonActionTypeEnum } from './common-action-type'
import { CommonActionTypes } from './common-action'
import { commonStore, ICommonStore } from './common-store'

const commonReducerHander = {
  [CommonActionTypeEnum.COMMON_OPEN_MESSAGE_DRAWER]: (store: ICommonStore): ICommonStore => {
    return { ...store, messageDrawerIsShow: true }
  },
  [CommonActionTypeEnum.COMMON_CLOSE_MESSAGE_DRAWER]: (store: ICommonStore): ICommonStore => {
    return { ...store, messageDrawerIsShow: false }
  },
}

export const commonReducer = (store = commonStore, action: CommonActionTypes): ICommonStore => {
  switch (action.type) {
    case CommonActionTypeEnum.COMMON_OPEN_MESSAGE_DRAWER:
      return commonReducerHander[action.type](store)
    case CommonActionTypeEnum.COMMON_CLOSE_MESSAGE_DRAWER:
      return commonReducerHander[action.type](store)
    default:
      return store || {}
  }
}
