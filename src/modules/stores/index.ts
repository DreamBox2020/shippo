import { createStore } from 'redux'
import { rootReducer } from '../reducers'

export * from './user'

export type RootStoreTypes = ReturnType<typeof rootReducer>

export const rootStore = createStore(rootReducer)
