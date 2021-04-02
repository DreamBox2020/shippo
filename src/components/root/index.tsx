import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { rootStore } from '~/modules'
import { GlobalStyle } from '~/styles/global'
import RootRoute from './root-router'

export const Root = () => {
  return (
    <Provider store={rootStore}>
      <GlobalStyle></GlobalStyle>
      <HashRouter>
        <RootRoute></RootRoute>
      </HashRouter>
    </Provider>
  )
}

export default Root
