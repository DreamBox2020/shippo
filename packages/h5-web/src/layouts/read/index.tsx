import React from 'react'
import {
  Layout,
  Menu,
  Input,
  Tabs,
  Card,
  List,
  Avatar,
  Affix,
  Button,
  Space,
  Dropdown,
} from 'antd'
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

import avatar from '~/assets/avatar.png'

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
              items={[
                {
                  label: 'Shippo',
                  key: 'index',
                  icon: <img width="40px" src={avatar} alt="" />,
                },
                { label: '导航1', key: 'app1' },
                { label: '导航2', key: 'app2' },
                { label: '导航3', key: 'app3' },
                { label: '导航4', key: 'app4' },
              ]}
            />
          </div>
          <div style={{ flex: '1 1 0%', backgroundColor: '#fff' }}>
            <Search
              placeholder=""
              allowClear
              onSearch={onSearch}
              style={{
                width: '100%',
                maxWidth: '500px',
                padding: '12px 10px 0 50px',
              }}
              size="large"
            />
          </div>
          <div style={{ backgroundColor: '#fff', padding: '0 20px' }}>
            <Space size={30}>
              <Dropdown
                placement="bottom"
                overlay={
                  <Menu
                    items={[
                      { label: '个人中心', key: '1' },
                      { label: '投稿管理', key: '2' },
                      { type: 'divider', key: '3' },
                      { label: '退出登录', key: '4' },
                    ]}
                  />
                }
              >
                <Avatar size={40} icon={<UserOutlined />} />
              </Dropdown>

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
              items={[
                { label: '推荐', key: 'home' },
                { label: '动画', key: 'a' },
                { label: '漫画', key: 'c' },
                { label: '游戏', key: 'g' },
                { label: '轻小说', key: 'n' },
              ]}
            />
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
            <div style={{ overflow: 'auto', maxHeight: '100vh' }}>
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
