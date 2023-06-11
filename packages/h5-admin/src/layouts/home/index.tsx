import { Layout, Menu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { useState } from 'react'
import { Dropdown } from 'antd'
import { useNavigate, useLocation, Outlet } from 'react-router'

import avatar from '~/assets/avatar.png'

const { Header, Footer, Sider, Content } = Layout

const StyledLogo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  /* padding: 16px; */
  cursor: pointer;
  > img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
  > h1 {
    display: inline-block;
    height: 32px;
    margin: 0 0 0 12px;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
    vertical-align: middle;
    animation: layout-title-hide 0.3s;
  }
`

const StyledSider = styled(Sider)`
  position: fixed !important;
  top: 0;
  left: 0;
  height: 100%;
  overflow: auto;
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
`

const defaultRenderCollapsedButton = (collapsed?: boolean) =>
  collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />

export const Home = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const history = useNavigate()

  return (
    <Layout>
      <div
        style={{
          width: collapsed ? 48 : 200,
          overflow: 'hidden',
          flex: `0 0 ${collapsed ? 48 : 200}px`,
          maxWidth: collapsed ? 48 : 200,
          minWidth: collapsed ? 48 : 200,
          transition: `background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)`,
        }}
      />
      <StyledSider
        collapsed={collapsed}
        style={{
          overflow: 'hidden',
        }}
        collapsedWidth={48}
        width={200}
      >
        <StyledLogo
          className="logo"
          style={{
            padding: collapsed ? '16px 8px' : '16px',
          }}
        >
          <img src={avatar} alt="" />
          {collapsed ? null : <h1>Shippo Admin</h1>}
        </StyledLogo>
        <div
          style={{
            flex: '1 1 0%',
            overflow: 'hidden auto',
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            style={{
              minHeight: '100%',
            }}
            onSelect={({ key }) => {
              if (key[0] !== '/') return
              console.log(key)
              history(key)
            }}
            items={[
              {
                label: '仪表盘',
                key: '/dashboard',
                icon: <UserOutlined />,
              },
              { label: '用户管理', key: '/users', icon: <UserOutlined /> },
              {
                label: '权限管理',
                key: '/permission',
                icon: <UserOutlined />,
                children: [
                  {
                    label: '角色设置',
                    key: '/permission/role',
                  },
                  {
                    label: '权限策略设置',
                    key: '/permission/policy',
                  },
                  {
                    label: '访问规则设置',
                    key: '/permission/access',
                  },
                ],
              },
              {
                label: '开发工具',
                key: '/devtools',
                icon: <UserOutlined />,
                children: [
                  {
                    label: '接口测试',
                    key: '/devtools/apitest',
                  },
                ],
              },
              { label: '个人设置', key: '4', icon: <UserOutlined /> },
              { label: '文章管理', key: '5', icon: <UserOutlined /> },
              {
                label: '临时页面',
                key: '/temp',
                icon: <UserOutlined />,
                children: [{ label: '手办活动', key: '/temp/temp_trade_20220108' }],
              },
            ]}
          />
        </div>
        <div>
          <Menu
            theme="dark"
            mode="inline"
            inlineIndent={16}
            selectedKeys={[]}
            openKeys={[]}
            items={[
              {
                title: '',
                label: defaultRenderCollapsedButton(collapsed),
                key: 'collapsed',
                onClick: () => setCollapsed(!collapsed),
              },
            ]}
          />
        </div>
      </StyledSider>
      <Layout>
        <Header
          style={{
            height: '48px',
            backgroundColor: '#fff',
          }}
        >
          {/* <Dropdown
            overlay={
              <Menu selectedKeys={[]}>
                <Menu.Item key="center">
                  <UserOutlined />
                  个人中心
                </Menu.Item>

                <Menu.Item key="settings">
                  <UserOutlined />
                  个人设置
                </Menu.Item>

                <Menu.Divider />
                <Menu.Item key="logout">
                  <UserOutlined />
                  退出登录
                </Menu.Item>
              </Menu>
            }
          >
            <div>name</div>
          </Dropdown> */}
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}

export default Home
