import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { stores } from '~/modules'
import { GlobalStyle } from '~/styles/global'
import RootRoute from './root-router'
import VConsole from 'vconsole'

export const Root = () => {
  useEffect(() => {
    new VConsole()
  }, [])

  return (
    <Provider store={stores}>
      <GlobalStyle></GlobalStyle>
      <HashRouter>
        <RootRoute></RootRoute>
      </HashRouter>
    </Provider>
  )
}

export default Root
