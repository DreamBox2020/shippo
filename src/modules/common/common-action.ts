import { CommonActionTypeEnum } from './common-action-type'

export type CommonActionTypes =
  | {
      type: CommonActionTypeEnum.COMMON_OPEN_MESSAGE_DRAWER
    }
  | {
      type: CommonActionTypeEnum.COMMON_CLOSE_MESSAGE_DRAWER
    }

export const commonAction = {
  commonOpenMessageDrawer: () => {
    return {
      type: CommonActionTypeEnum.COMMON_OPEN_MESSAGE_DRAWER,
    }
  },

  commonCloseMessageDrawer: () => {
    return {
      type: CommonActionTypeEnum.COMMON_CLOSE_MESSAGE_DRAWER,
    }
  },
}
