import React, { lazy, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { COLOR_GRAY, COLOR_PINK } from '~/constants/color'
import { withLoading } from '~/components/loading-hoc'
import { TabBar } from 'antd-mobile'
import { Icon } from '~/components/icon'
import { Container } from '~/components/container'
import { Main } from '~/components/main'
import { Footer } from '~/components/footer'
import { SwitchRoute, RouteS } from '~/components/switch-route'
import styled from 'styled-components'

const StyledTabBar = styled(TabBar)`
  .adm-tab-bar-item {
    color: ${COLOR_GRAY};
  }
  .adm-tab-bar-item-active {
    color: ${COLOR_PINK};
  }
`

type tabBarItem = RouteS & {
  path: string
  title: string
  icon: string
}

const tabBarItems: Array<tabBarItem> = [
  {
    key: 'home',
    path: '/home',
    exact: true,
    title: '首页',
    icon: 'shouye',
    component: withLoading(lazy(() => import('~/pages/home'))),
  },
  {
    key: 'discover',
    path: '/discover',
    exact: true,

    title: '发现',
    icon: 'faxian',
    component: withLoading(lazy(() => import('~/pages/discover'))),
  },
  {
    key: 'my',
    path: '/my',
    exact: true,
    title: '我',
    icon: 'wode',
    component: withLoading(lazy(() => import('~/pages/my'))),
  },
]

export const Home = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()

  const [selectedTab, setSelectedTab] = useState(
    tabBarItems.find((item) => item.path === routeMatch.path)!.key
  )

  const onPress = (activeKey: string) => {
    setSelectedTab(activeKey)
    const path = tabBarItems.find((item) => item.key === activeKey)?.path
    path && history.push(path)
  }

  return (
    <Container direction="vertical">
      <Main>
        <SwitchRoute routes={tabBarItems} />
      </Main>
      <Footer height="50px" style={{ backgroundColor: '#fff' }}>
        <StyledTabBar activeKey={selectedTab} onChange={(activeKey) => onPress(activeKey)}>
          {tabBarItems.map((item) => (
            <TabBar.Item title={item.title} key={item.key} icon={<Icon type={item.icon} />} />
          ))}
        </StyledTabBar>
      </Footer>
    </Container>
  )
}

export default Home
