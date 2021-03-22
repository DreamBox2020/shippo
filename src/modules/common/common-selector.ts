import { RootStoreTypes } from '..'

export const commonSelector = {
  messageDrawerIsShowGetter: () => (state: RootStoreTypes) => state.common.messageDrawerIsShow,
}
