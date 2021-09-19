import React from 'react'
import { Layout, Menu, Input, Tabs, Card, List, Avatar, Affix, Button, Space } from 'antd'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  FormOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import type { MenuClickEventHandler } from 'rc-menu/es/interface'

const { Header, Footer, Content, Sider } = Layout
const { SubMenu } = Menu
const { Search } = Input
const { TabPane } = Tabs

export const ReadLayout: React.FC = () => {
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
        <div style={{ display: 'flex' }}>
          <div>
            <Menu
              onClick={handleClick}
              selectedKeys={[current]}
              mode="horizontal"
              style={{ borderBottom: '1px solid #fff' }}
            >
              <Menu.Item
                key="index"
                icon={<img width="40px" src={require('~/assets/avatar.png').default} alt="" />}
              >
                Shippo
              </Menu.Item>
              <Menu.Item key="app1">导航1</Menu.Item>
              <Menu.Item key="app2">导航2</Menu.Item>
              <Menu.Item key="app3">导航3</Menu.Item>
              <Menu.Item key="app4">导航4</Menu.Item>
            </Menu>
          </div>
          <div style={{ flex: '1 1 0%', backgroundColor: '#fff' }}>
            <Search
              placeholder=""
              allowClear
              onSearch={onSearch}
              style={{ width: '100%', maxWidth: '500px', padding: '12px 10px 0 50px' }}
              size="large"
            />
          </div>
          <div style={{ backgroundColor: '#fff', padding: '0 20px' }}>
            <Space size={30}>
              <Avatar size={40} icon={<UserOutlined />} />
              <Button type="primary">投稿</Button>
            </Space>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider width="250px" theme="light" style={{ paddingTop: '20px' }}>
          <Affix offsetTop={20} onChange={(affixed) => console.log(affixed)}>
            <Menu
              // onClick={handleClick}
              style={{ width: '250px' }}
              defaultSelectedKeys={['home']}
              mode="inline"
            >
              <Menu.Item key="home" icon={<MailOutlined />}>
                推荐
              </Menu.Item>
              <Menu.Item key="a" icon={<MailOutlined />}>
                动画
              </Menu.Item>
              <Menu.Item key="c" icon={<MailOutlined />}>
                漫画
              </Menu.Item>
              <Menu.Item key="g" icon={<MailOutlined />}>
                游戏
              </Menu.Item>
              <Menu.Item key="n" icon={<MailOutlined />}>
                轻小说
              </Menu.Item>
            </Menu>
          </Affix>
        </Sider>
        <Content>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
          <p style={{ height: '200px', padding: '30px' }}>内容</p>
        </Content>
        <Sider theme="light" width="300px" style={{ paddingTop: '20px' }}>
          <Affix offsetTop={20} onChange={(affixed) => console.log(affixed)}>
            <div style={{ overflow: 'scroll', maxHeight: '100vh' }}>
              <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{ width: '300px' }}
              />
              <Card title="排行榜" bordered={false} style={{ width: '300px' }}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="日榜" key="1">
                    日榜
                  </TabPane>
                  <TabPane tab="周榜" key="2">
                    周榜
                  </TabPane>
                  <TabPane tab="月榜" key="3">
                    月榜
                  </TabPane>
                </Tabs>
              </Card>
              <Card title="更多" bordered={false} style={{ width: '300px' }}>
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  split={false}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" icon={item.icon} />}
                        title={<a href="https://ant.design">{item.title}</a>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </Affix>
        </Sider>
      </Layout>
    </Layout>
  )
}

export default ReadLayout
