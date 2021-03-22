import { RootStoreTypes } from '..'

export const exampleSelector = {
  countGetter: () => (state: RootStoreTypes) => state.example.count,
}
