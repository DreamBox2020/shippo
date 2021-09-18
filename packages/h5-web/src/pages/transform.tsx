import { useLocation } from 'react-router'

export const Transform = () => {
  const handleClick = () => {
    const key = ''
    const appid = ''
    const redirectUri = ''
    const scope = 'snsapi_base,snsapi_userinfo'
    window.location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${key}#wechat_redirect`
  }

  const location = useLocation()

  return (
    <div>
      <p>{location.search}</p>
      <p>{location.hash}</p>
      <button onClick={handleClick}>微信登录</button>
    </div>
  )
}
