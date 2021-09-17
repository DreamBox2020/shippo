import { Action } from 'redux'
import { createAsyncAction } from '@kazura/react-store'
import { IStores } from '..'

const asyncAction = createAsyncAction<IStores, undefined, Action<string>>()

export const userUpdateInfo = asyncAction(() => async () => {})
