import { ExampleActionTypeEnum } from '.'

export type exampleActionTypes = {
  type: ExampleActionTypeEnum.EXAMPLE_ADD
  payload: number
}

export const exampleAction = {
  exampleAdd: (number: number) => {
    return {
      type: ExampleActionTypeEnum.EXAMPLE_ADD,
      payload: number,
    }
  },
}
