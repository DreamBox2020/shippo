import { ExampleActionTypeEnum, exampleActionTypes, exampleStore, IExampleStore } from '.'

const exampleReducerHander = {
  [ExampleActionTypeEnum.EXAMPLE_ADD]: (store: IExampleStore, payload: number): IExampleStore => {
    return { ...store, count: store.count + payload }
  },
}

export const exampleReducer = (store = exampleStore, action: exampleActionTypes) => {
  switch (action.type) {
    case ExampleActionTypeEnum.EXAMPLE_ADD:
      return exampleReducerHander[action.type](store, action.payload)
    default:
      return store || {}
  }
}
