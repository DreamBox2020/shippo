import { List, Image, Empty } from 'antd-mobile'
import styled from 'styled-components'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import avatar from '~/assets/avatar.png'
import { useNavigate } from 'react-router'
import { useCallback, useEffect, useState } from 'react'
import { IWxArticleExtOffiaccountNickname } from '@shippo/types'
import { services } from '@shippo/sdk-services'
import { formatTimeStr } from '@shippo/sdk-utils'
import { config } from '~/config'
import { userGetters } from '@shippo/sdk-stores'
import { useSelector } from 'react-redux'

export const StyledList = styled(List)`
  .adm-list-body {
    background-color: unset;
  }

  .adm-list-item-content {
    border-top: 0;
  }

  .adm-list-item {
    margin-bottom: 12px;
    border-radius: 8px;
  }

  &.adm-list-card .adm-list-body {
    border-radius: 0;
  }

  .adm-list-item-content-arrow {
    display: none;
  }

  .adm-list-item-content-main {
    padding: 15px 0;
  }

  .adm-list-item-content-prefix {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .adm-list-item-content-extra {
    padding-top: 12px;
    padding-bottom: 12px;
  }
`

export const WxPage = () => {
  // 用户信息
  const userInfo = useSelector(userGetters.infoGetter())

  const navigate = useNavigate()

  const [articleList, setArticleList] = useState<
    IWxArticleExtOffiaccountNickname[]
  >([])

  // useEffect(() => {
  //   services.wxArticle.find_all().then((hr) => {
  //     setArticleList(hr.data.resource)
  //   })
  // }, [])

  useEffect(() => {
    if (userInfo.uid > 0) {
      services.wxArticle.find_all_by_wx_passport_and_comment().then((hr) => {
        setArticleList(hr.data.resource)
      })
    }
  }, [userInfo.uid])

  const onClick = useCallback(
    (article: IWxArticleExtOffiaccountNickname) => {
      navigate(`/wx/article/${article.id}?channel=self`)
    },
    [navigate]
  )

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
        互动
      </Header>
      <Main>
        <StyledList mode="card">
          {articleList.length ? null : (
            <Empty
              style={{ padding: '64px 0' }}
              imageStyle={{ width: 128 }}
              description="暂无数据"
            />
          )}
          {articleList.map((article) => (
            <List.Item
              key={article.id}
              clickable
              extra={
                <Image
                  src={config.BASE_API + '/file' + article.image2}
                  // src={article.image2}
                  fit="cover"
                  width={141}
                  height={60}
                />
              }
              description={`${article.offiaccountNickname} ${formatTimeStr(
                article.createdAt
              )}`}
              onClick={() => onClick(article)}
              // onClick={() =>
              //   window.wx.miniProgram.navigateTo({
              //     url:
              //       '/pages/article/index?url=' +
              //       encodeURIComponent(article.url),
              //   })
              // }
            >
              {article.title}
            </List.Item>
          ))}
        </StyledList>
      </Main>
    </Container>
  )
}

export default WxPage
