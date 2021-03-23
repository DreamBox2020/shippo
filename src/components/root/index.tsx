import React from 'react'
import { Provider } from 'react-redux'
import { rootStore } from '~/modules'
import { GlobalStyle } from '~/styles/global'
import RootRoute from './root-router'

export const Root = () => {
  return (
    <Provider store={rootStore}>
      <GlobalStyle></GlobalStyle>
      <RootRoute></RootRoute>
    </Provider>
  )
}

export default Root
