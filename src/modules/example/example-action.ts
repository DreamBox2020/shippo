import { createAction } from '../util'
import { IExampleStore } from './example-store'

const action = createAction<IExampleStore>('example')

export const exampleAction = {
  add: action((count: number) => ({ count })),
}
