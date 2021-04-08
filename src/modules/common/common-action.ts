import { createAction } from '../helpers'
import { ICommonStore } from './common-store'

const action = createAction<ICommonStore>('example')

export const commonAction = {
  commonOpenMessageDrawer: action(() => ({ messageDrawerIsShow: true })),

  commonCloseMessageDrawer: action(() => ({ messageDrawerIsShow: false })),
}
