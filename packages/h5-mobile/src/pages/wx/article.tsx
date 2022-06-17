import { ActionSheet, NavBar, Space, Image } from 'antd-mobile'
import { useLocation, useNavigate, useParams } from 'react-router'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import { MoreOutline } from 'antd-mobile-icons'
import { useEffect, useMemo, useState } from 'react'
import type { Action } from 'antd-mobile/es/components/action-sheet'
import { useSearchParams } from 'react-router-dom'
import { services, __wxArticleExtOffiaccountNickname } from '@shippo/sdk-services'
import { userSelector } from '@shippo/sdk-stores'
import { useSelector } from 'react-redux'
import { BASE_API, IS_MINIPROGRAM } from '~/settings'

const __defaultWxArticleExtOffiaccountNickname = __wxArticleExtOffiaccountNickname()

export const WxArticlePage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()
  const location = useLocation()
  console.log(location)

  // 动作面板（评论区开关
  const [manageActionSheetVisible, setManageActionSheetVisible] = useState(false)
  // 文章，来自服务器的数据
  const [article, setArticle] = useState(__defaultWxArticleExtOffiaccountNickname)
  // 用户信息
  const userInfo = useSelector(userSelector.infoGetter())

  // 文章id，来自url
  const articleId = useMemo(() => {
    const num = parseInt(params.id || '')
    return isNaN(num) ? 0 : num
  }, [params.id])

  // 渠道，来自url（manage从管理页面进入，self从其他自身页面进入，为空则代表从文章页面进入。
  const channel = useMemo(() => {
    const str = searchParams.get('channel') || ''
    return str
  }, [searchParams])

  // 是否为管理员模式
  const isManage = useMemo(() => {
    if (channel !== 'manage') return false
    return article.wxPassportId === userInfo.user.wxPassportId
  }, [channel, article, userInfo])

  useEffect(() => {
    if (articleId) {
      services.wxArticle.find({ id: articleId }).then((hr) => {
        setArticle(hr.data.resource)
      })
    }
  }, [articleId])

  const actions: Action[] = [{ text: '关闭留言', key: 'switch' }]

  return (
    <Container direction="vertical">
      <Header
        style={{
          height: '45px',
          lineHeight: '45px',
          backgroundColor: '#fff',
          textAlign: 'center',
          fontSize: '18px',
        }}
      >
        <NavBar
          onBack={() => {
            // 如果为false，则是从微信文章页面点击小程序进入的，此时点返回，直接前往首页。
            if (channel) {
              navigate(-1)
            } else {
              navigate('/wx')
            }
          }}
          right={
            <div style={{ fontSize: 24 }}>
              <Space style={{ '--gap': '16px' }}>
                <MoreOutline onClick={() => setManageActionSheetVisible(true)} />
              </Space>
            </div>
          }
        >
          留言
        </NavBar>
      </Header>
      <Main>
        {article.id ? (
          <div
            style={{ width: '100%', position: 'relative' }}
            onClick={() => {
              if (article.url) {
                if (IS_MINIPROGRAM) {
                  window.wx.miniProgram.navigateTo({ url: '/pages/article/index' })
                }
              }
            }}
          >
            <Image src={BASE_API + '/file' + article.image2} fit="cover" width="100%" />
            <p
              style={{
                position: 'absolute',
                bottom: 0,
                color: '#fff',
                fontSize: '16px',
                lineHeight: 2,
              }}
            >
              {article.title}
            </p>
          </div>
        ) : null}
      </Main>
      {isManage ? (
        <ActionSheet
          visible={manageActionSheetVisible}
          actions={actions}
          onClose={() => setManageActionSheetVisible(false)}
        />
      ) : null}
    </Container>
  )
}

export default WxArticlePage
