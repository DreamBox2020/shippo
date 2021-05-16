import { RootStoreTypes } from '..'

export const infoGetter = () => (state: RootStoreTypes) => state.user.info
