import { TabBar } from 'antd-mobile'
import { Outlet, useLocation, useNavigate } from 'react-router'
import Container from '~/components/container'
import Footer from '~/components/footer'
import Main from '~/components/main'
import { MessageOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons'
import { useCallback, useMemo } from 'react'
import { hasAccess } from '@shippo/sdk-utils'
import { userSelector } from '@shippo/sdk-stores'
import { useSelector } from 'react-redux'

const safeArea = getComputedStyle(document.documentElement).getPropertyValue('--sab').trim()
console.log('safeArea:', safeArea)

const tabs = [
  {
    key: '/wx',
    title: '互动',
    icon: <MessageOutline />,
  },
  {
    key: '/wx/manage',
    title: '管理',
    icon: <UnorderedListOutline />,
  },
  {
    key: '/wx/my',
    title: '我的',
    icon: <UserOutline />,
  },
]

export const WxLayout = () => {
  const userInfo = useSelector(userSelector.infoGetter())
  const history = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const hasPermission = useCallback(
    (accessRule: string) => {
      return hasAccess(
        `sys_mobile:${accessRule}`,
        userInfo.access.filter((i) => i.accessType === 'resource').map((i) => i.accessRule)
      )
    },
    [userInfo.access]
  )

  const safeAreaHeight = useMemo(() => {
    const height = parseInt(safeArea)
    return isNaN(height) ? 0 : height
  }, [])

  const setRouteActive = (value: string) => {
    history(value)
  }

  return (
    <Container direction="vertical">
      <Main>
        <Outlet />
      </Main>
      <Footer height={50 + safeAreaHeight + 'px'} style={{ backgroundColor: '#fff' }}>
        <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
          {tabs.map((item) =>
            hasPermission(item.key) ? (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ) : null
          )}
        </TabBar>
      </Footer>
    </Container>
  )
}

export default WxLayout
