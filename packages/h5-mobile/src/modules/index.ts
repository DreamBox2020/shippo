import { applyMiddleware } from 'redux'
import { createStore } from '@shippo/sdk-stores'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import { config } from '~/config'

const { stores, dispatch, thunkDispatch, selector } = createStore((...middleware) => {
  if (config.isLocal()) {
    middleware.push(createLogger())
  }
  return composeWithDevTools(applyMiddleware(...middleware))
})

export { stores, dispatch, thunkDispatch, selector }
