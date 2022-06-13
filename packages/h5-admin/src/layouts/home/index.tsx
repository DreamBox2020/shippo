import { Layout, Menu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useState } from 'react'
import { Dropdown } from 'antd'
import { useNavigate, useLocation, Outlet } from 'react-router'

import avatar from '~/assets/avatar.png'

const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

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
  position: fixed;
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
          >
            <Menu.Item key="/dashboard" icon={<UserOutlined />}>
              仪表盘
            </Menu.Item>
            <Menu.Item key="/users" icon={<UserOutlined />}>
              用户管理
            </Menu.Item>
            <SubMenu key="/permission" icon={<UserOutlined />} title="权限管理">
              <Menu.Item key="/permission/role">角色设置</Menu.Item>
              <Menu.Item key="/permission/policy">权限策略设置</Menu.Item>
              <Menu.Item key="/permission/access">访问规则设置</Menu.Item>
            </SubMenu>
            <SubMenu key="/devtools" icon={<UserOutlined />} title="开发工具">
              <Menu.Item key="/devtools/apitest">接口测试</Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<UserOutlined />}>
              个人设置
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined />}>
              文章管理
            </Menu.Item>
            <SubMenu key="/temp" icon={<UserOutlined />} title="临时页面">
              <Menu.Item key="/temp/temp_trade_20220108">手办活动</Menu.Item>
              <Menu.Item key="3">Option 2</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div>
          <Menu theme="dark" mode="inline" inlineIndent={16} selectedKeys={[]} openKeys={[]}>
            <Menu.Item title={false} key="collapsed" onClick={() => setCollapsed(!collapsed)}>
              {defaultRenderCollapsedButton(collapsed)}
            </Menu.Item>
          </Menu>
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
