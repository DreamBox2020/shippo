import React, { lazy, useState } from 'react'
import { useNavigate, useMatch } from 'react-router-dom'
import { COLOR_GRAY, COLOR_PINK } from '~/constants/color'
import { withLoading } from '~/components/loading-hoc'
import { TabBar } from 'antd-mobile'
import { Icon } from '~/components/icon'
import { Container } from '~/components/container'
import { Main } from '~/components/main'
import { Footer } from '~/components/footer'
import { SwitchRoute, RouteS } from '~/components/switch-route'
import styled from 'styled-components'
import { useLocation } from 'react-router'

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
    title: '首页',
    icon: 'shouye',
    element: withLoading(lazy(() => import('~/pages/home'))),
  },
  {
    key: 'discover',
    path: '/discover',
    title: '发现',
    icon: 'faxian',
    element: withLoading(lazy(() => import('~/pages/discover'))),
  },
  {
    key: 'my',
    path: '/my',
    title: '我',
    icon: 'wode',
    element: withLoading(lazy(() => import('~/pages/my'))),
  },
]

export const Home = () => {
  const history = useNavigate()
  const location = useLocation()
  console.log(location)

  const [selectedTab, setSelectedTab] = useState(
    tabBarItems.find((item) => item.path === location.pathname)!.key
  )

  const onPress = (activeKey: string) => {
    setSelectedTab(activeKey)
    const path = tabBarItems.find((item) => item.key === activeKey)?.path
    path && history(path)
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
