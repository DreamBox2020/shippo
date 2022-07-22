import { Layout } from 'antd'
import { Outlet } from 'react-router'

const { Header, Footer, Sider, Content } = Layout

export const LayoutHome = () => {
  return <Outlet />
}

export default LayoutHome
