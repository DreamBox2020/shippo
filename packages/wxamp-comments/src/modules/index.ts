import { applyMiddleware } from 'redux'
import { createStore } from '@shippo/sdk-stores'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import { IS_DEV } from '~/settings'

const { stores, dispatch, thunkDispatch, selector } = createStore(
  (...middleware) => {
    if (IS_DEV) {
      middleware.push(createLogger())
    }
    return composeWithDevTools(applyMiddleware(...middleware))
  }
)

export { stores, dispatch, thunkDispatch, selector }
