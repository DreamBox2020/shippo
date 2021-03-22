import { RootStoreTypes } from '..'

export const userSelector = {
  infoGetter: () => (state: RootStoreTypes) => state.user.info,
}
