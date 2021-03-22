import {
  applyMiddleware,
  createStore,
  Middleware,
  combineReducers,
  Action,
  AnyAction,
  Dispatch,
} from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import { IS_DEV } from '~/settings'

import { exampleReducer } from './example'
import { userReducer } from './user'
import { commonReducer } from './common'

export const rootReducer = combineReducers({
  example: exampleReducer,
  user: userReducer,
  common: commonReducer,
})

export type RootStoreTypes = ReturnType<typeof rootReducer>

export interface ThunkDispatch<A extends Action = AnyAction> {
  <TReturnType = any, TState = any, TExtraThunkArg = any>(
    thunkAction: ThunkAction<TReturnType, TState, TExtraThunkArg, A>
  ): TReturnType
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStoreTypes,
  unknown,
  Action<string>
>

const middleware: Array<Middleware> = [thunkMiddleware]
if (IS_DEV) {
  middleware.push(createLogger())
}

export const rootStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export const asyncDispatch = (asyncAction: AppThunk) =>
  asyncAction(rootStore.dispatch, rootStore.getState, undefined)

export const dispatch: Dispatch = (action) => rootStore.dispatch(action)

export const selector = <T>(selector: (store: RootStoreTypes) => T) =>
  selector(rootStore.getState())
