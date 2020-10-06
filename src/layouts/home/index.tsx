import React, { lazy, Suspense, useState } from 'react'
import { TabBar } from 'antd-mobile'
import { Icon } from '../../components/icon'
import styled from 'styled-components'

const StyledLoading = styled.div`
  height: 100%;
  background: url(${require('../../assets/loading.gif')}) center / 100% no-repeat fixed #fff;
`

const tabBarItems = [
  { key: 'home', title: '首页', icon: 'shouye', component: lazy(() => import('../../pages/home')) },
  {
    key: 'discover',
    title: '发现',
    icon: 'faxian',
    component: lazy(() => import('../../pages/discover')),
  },
  { key: 'my', title: '我', icon: 'wode', component: lazy(() => import('../../pages/my')) },
]

export const Home = () => {
  const [selectedTab, setSelectedTab] = useState('home')

  const onPress = (key: string) => {
    setSelectedTab(key)
  }

  const renderContent = (key: string) => {
    const CurrentComponent = tabBarItems.find((item) => item.key === key)!.component
    return (
      <Suspense fallback={<StyledLoading />}>
        <CurrentComponent />
      </Suspense>
    )
  }

  return (
    <TabBar tintColor="#EA7A99" unselectedTintColor="#767676" prerenderingSiblingsNumber={0}>
      {tabBarItems.map((item) => (
        <TabBar.Item
          selected={item.key === selectedTab}
          title={item.title}
          key={item.key}
          icon={<Icon type={item.icon} />}
          selectedIcon={<Icon type={item.icon} />}
          onPress={() => onPress(item.key)}
        >
          {renderContent(item.key)}
        </TabBar.Item>
      ))}
    </TabBar>
  )
}

export default Home
