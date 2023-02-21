import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLOR_GRAY, COLOR_PINK } from '~/constants/color'
import { TabBar } from 'antd-mobile'
import { Icon } from '~/components/icon'
import { Container } from '~/components/container'
import { Main } from '~/components/main'
import { Footer } from '~/components/footer'
import styled from '@emotion/styled'
import { useLocation, Outlet } from 'react-router'

const StyledTabBar = styled(TabBar)`
  .adm-tab-bar-item {
    color: ${COLOR_GRAY};
  }
  .adm-tab-bar-item-active {
    color: ${COLOR_PINK};
  }
`

type tabBarItem = {
  path: string
  title: string
  icon: string
}

const tabBarItems: Array<tabBarItem> = [
  {
    path: '/home',
    title: '首页',
    icon: 'shouye',
  },
  {
    path: '/discover',
    title: '发现',
    icon: 'faxian',
  },
  {
    path: '/dynamic',
    title: '动态',
    icon: 'faxian',
  },
  {
    path: '/my',
    title: '我',
    icon: 'wode',
  },
]

export const LayoutHome = () => {
  const history = useNavigate()
  const location = useLocation()
  console.log(location)

  const [selectedTab, setSelectedTab] = useState(
    tabBarItems.find((item) => item.path === location.pathname)!.path
  )

  const onPress = (activeKey: string) => {
    setSelectedTab(activeKey)
    const path = tabBarItems.find((item) => item.path === activeKey)?.path
    path && history(path)
  }

  return (
    <Container direction="vertical">
      <Main>
        <Outlet />
      </Main>
      <Footer height="50px" style={{ backgroundColor: '#fff' }}>
        <StyledTabBar activeKey={selectedTab} onChange={(activeKey) => onPress(activeKey)}>
          {tabBarItems.map((item) => (
            <TabBar.Item title={item.title} key={item.path} icon={<Icon type={item.icon} />} />
          ))}
        </StyledTabBar>
      </Footer>
    </Container>
  )
}

export default LayoutHome
