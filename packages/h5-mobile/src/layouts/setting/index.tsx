import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'

export const LayoutSetting = () => {
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  )
  return <Outlet />
}

export default LayoutSetting
