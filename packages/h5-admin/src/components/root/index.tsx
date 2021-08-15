import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { rootStore } from '~/modules'
import { GlobalStyle } from '~/styles/global'
import RootRoute from './root-router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

export const Root = () => {
  return (
    <Provider store={rootStore}>
      <GlobalStyle></GlobalStyle>
      <HashRouter>
        <ConfigProvider locale={zhCN}>
          <RootRoute></RootRoute>
        </ConfigProvider>
      </HashRouter>
    </Provider>
  )
}

export default Root
