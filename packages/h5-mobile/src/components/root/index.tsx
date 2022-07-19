import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { store } from '@shippo/sdk-stores'
import { GlobalStyle } from '~/styles/global'
import RootRoute from './root-router'
import VConsole from 'vconsole'

export const Root = () => {
  useEffect(() => {
    const tag = window.localStorage.getItem('__SHIPPO_DEBUG')
    if (tag) {
      new VConsole()
    }
  }, [])

  return (
    <Provider store={store}>
      <GlobalStyle></GlobalStyle>
      <HashRouter>
        <RootRoute></RootRoute>
      </HashRouter>
    </Provider>
  )
}

export default Root
