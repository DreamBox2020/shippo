import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { logger } from 'redux-logger'
import { userSlice } from './user/user-slice'

export * from 'immer'
export * from 'redux-thunk'

export * from './user'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: true,
      },
    }).concat(logger),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
