import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@shippo/sdk-stores'
import { GlobalStyle } from '~/styles/global'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import NavigatorLayout from '~/layouts/navigator'

export const Root = () => {
  return (
    <Provider store={store}>
      <GlobalStyle></GlobalStyle>
      <ConfigProvider locale={zhCN}>
        <NavigatorLayout></NavigatorLayout>
      </ConfigProvider>
    </Provider>
  )
}

export default Root
