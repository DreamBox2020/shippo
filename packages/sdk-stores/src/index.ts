import {
  applyMiddleware,
  createStore as create,
  Middleware,
  combineReducers,
  Action,
  AnyAction,
  Dispatch,
  StoreEnhancer,
} from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'

import { userReducer } from './user/user-reducer'

export * from './helpers'

export const reducers = combineReducers({ user: userReducer })

export type IStores = ReturnType<typeof reducers>

export interface ThunkDispatch<A extends Action = AnyAction> {
  <TReturnType = any, TState = any, TExtraThunkArg = any>(
    thunkAction: ThunkAction<TReturnType, TState, TExtraThunkArg, A>
  ): TReturnType
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IStores, unknown, Action<string>>

export const createStore = (compose?: (...middleware: Middleware[]) => StoreEnhancer) => {
  compose = compose || applyMiddleware
  const middleware: Array<Middleware> = [thunkMiddleware]
  const stores = create(reducers, compose(...middleware))
  const thunkDispatch: ThunkDispatch = (action) => stores.dispatch<any>(action)
  const dispatch: Dispatch = (action) => stores.dispatch<any>(action)
  const selector = <T>(selector: (store: IStores) => T) => selector(stores.getState())
  return {
    stores,
    thunkDispatch,
    dispatch,
    selector,
  }
}
