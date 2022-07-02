import { RootState } from '..'

export const infoGetter = () => (state: RootState) => state.user.info
