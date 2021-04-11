import { exampleAction } from '.'
import { AppThunk } from '..'

const fetch = () =>
  new Promise<number>((resolve) => setTimeout(() => resolve(Math.round(Math.random() * 10)), 3000))

export const exampleAsyncAction = {
  add: (): AppThunk => async (dispatch) => {
    const res = await fetch()
    dispatch(exampleAction.add(res))
  },
}
