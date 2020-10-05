import React from 'react'
import { TabBar } from 'antd-mobile'
import { Icon } from '../../components/icon'

export const Home = () => {
  return (
    <TabBar tintColor="#EA7A99" unselectedTintColor="#767676">
      <TabBar.Item
        selected={true}
        title="首页"
        key="home"
        icon={<Icon type="shouye" />}
        selectedIcon={<Icon type="shouye" />}
      />
      <TabBar.Item title="发现" key="discover" icon={<Icon type="faxian" />} />
      <TabBar.Item title="我" key="my" icon={<Icon type="wode" />} />
    </TabBar>
  )
}
