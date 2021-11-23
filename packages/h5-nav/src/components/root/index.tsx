import React from 'react'
import { Provider } from 'react-redux'
import { stores } from '~/modules'
import { GlobalStyle } from '~/styles/global'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import NavigatorLayout from '~/layouts/navigator'

export const Root = () => {
  return (
    <Provider store={stores}>
      <GlobalStyle></GlobalStyle>
      <ConfigProvider locale={zhCN}>
        <NavigatorLayout></NavigatorLayout>
      </ConfigProvider>
    </Provider>
  )
}

export default Root
