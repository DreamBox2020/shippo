import React from 'react'
import { Layout, Menu, Input, Tabs, Card, List, Avatar, Affix, Button, Space, Dropdown } from 'antd'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  FormOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  HomeOutlined,
  FileTextOutlined,
  TeamOutlined,
  MessageOutlined,
  CrownOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import type { MenuClickEventHandler } from 'rc-menu/es/interface'
import styled from 'styled-components'
import { Tinymce } from '~/components/tinymce'

const { Header, Footer, Content, Sider } = Layout
const { SubMenu } = Menu
const { Search } = Input
const { TabPane } = Tabs

const StyledMenu = styled(Menu)`
  &.ant-menu {
    .ant-menu-sub.ant-menu-inline {
      background-color: #fff;
    }
    .ant-menu-item-selected {
      background-color: #fff;
    }
    .ant-menu-item::after {
      border: 0;
    }
    .ant-menu-item:active,
    .ant-menu-submenu-title:active {
      background-color: #fff;
    }
  }
`

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    margin-left: 40px;
    padding: 20px 0;
  }
  .ant-tabs-tabpane {
    padding: 4px 20px 20px 20px;
  }
`

export const CreationLayout: React.FC = () => {
  const [current, setCurrent] = useState('app1')

  const handleClick: MenuClickEventHandler = (event) => {
    console.log('click ', event)
    setCurrent(event.key)
  }
  const onSearch = (value: string) => console.log(value)
  const callback = (key: string) => {
    console.log(key)
  }

  const data = [
    {
      icon: <FormOutlined />,
      title: '投稿',
    },
    {
      icon: <QuestionCircleOutlined />,
      title: '帮助',
    },
  ]

  return (
    <Layout>
      <Header>
        <div style={{ display: 'flex', backgroundColor: '#fff' }}>
          <div style={{ width: '250px', fontSize: '25px', color: '#1890ff', textAlign: 'center' }}>
            Shippo 创作中心
          </div>
          <div style={{ flex: '1 1 0%' }}>
            <span style={{ fontSize: '16px', margin: '0 30px', color: '#757575' }}>
              <CrownOutlined style={{ marginRight: '5px' }} />
              主页
            </span>
          </div>
          <div style={{ padding: '0 50px' }}>
            <Dropdown
              placement="bottomCenter"
              overlay={
                <Menu>
                  <Menu.Item>个人中心</Menu.Item>
                  <Menu.Item>投稿管理</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item>退出登录</Menu.Item>
                </Menu>
              }
            >
              <Avatar size={40} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider width="250px" theme="light" style={{ paddingTop: '20px' }}>
          <Affix offsetTop={20} onChange={(affixed) => console.log(affixed)}>
            <div style={{ overflow: 'auto', maxHeight: '100vh' }}>
              <div style={{ padding: '10px 25px', textAlign: 'center' }}>
                <Button type="primary" size="large" style={{ width: '120px' }}>
                  投稿
                </Button>
              </div>
              <div style={{ padding: '0 25px' }}>
                <StyledMenu
                  style={{ width: '200px', border: 0, backgroundColor: '#fff' }}
                  defaultSelectedKeys={['1']}
                  mode="inline"
                >
                  <Menu.Item key="1" icon={<HomeOutlined />}>
                    首页
                  </Menu.Item>
                  <SubMenu key="sub1" icon={<FileTextOutlined />} title="内容管理">
                    <Menu.Item key="2">稿件管理</Menu.Item>
                  </SubMenu>
                  <Menu.Item key="5" icon={<TeamOutlined />}>
                    粉丝管理
                  </Menu.Item>
                  <SubMenu key="sub2" icon={<MessageOutlined />} title="互动管理">
                    <Menu.Item key="6">评论管理</Menu.Item>
                  </SubMenu>
                  <Menu.Item key="7" icon={<SettingOutlined />}>
                    创作设置
                  </Menu.Item>
                </StyledMenu>
              </div>
            </div>
          </Affix>
        </Sider>
        <Content>
          <div style={{ padding: '30px 50px' }}>
            <StyledTabs defaultActiveKey="1" style={{ backgroundColor: '#fff' }}>
              <TabPane tab="文章管理" key="1">
                <Tinymce></Tinymce>
              </TabPane>
              <TabPane tab="文章管理" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="文章管理" key="3">
                Content of Tab Pane 3
              </TabPane>
            </StyledTabs>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default CreationLayout
