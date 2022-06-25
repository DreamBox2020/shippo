import { List, Image } from 'antd-mobile'
import styled from 'styled-components'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import avatar from '~/assets/avatar.png'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { IWxArticleExtOffiaccountNickname } from '@shippo/types'
import { services } from '@shippo/sdk-services'
import { formatTimeStr } from '@shippo/sdk-utils'
import { BASE_API } from '~/settings'

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
  const navigate = useNavigate()

  const [articleList, setArticleList] = useState<IWxArticleExtOffiaccountNickname[]>([])

  useEffect(() => {
    services.wxArticle.find_all_by_wx_passport_and_comment().then((hr) => {
      setArticleList(hr.data.resource)
    })
  }, [])

  const users = [
    {
      id: '1',
      avatar: avatar,
      name: '文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题',
      description: '二次元趣闻',
    },
    {
      id: '2',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻',
    },
    {
      id: '3',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻',
    },
    {
      id: '4',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻',
    },
    {
      id: '5',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻',
    },
    {
      id: '6',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻',
    },
    {
      id: '7',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻',
    },
    {
      id: '8',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻',
    },
    {
      id: '9',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻',
    },
    {
      id: '10',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻',
    },
  ]

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
          {articleList.map((v) => (
            <List.Item
              key={v.id}
              clickable
              extra={
                <Image src={BASE_API + '/file' + v.image2} fit="cover" width={141} height={60} />
              }
              description={`${v.offiaccountNickname} ${formatTimeStr(v.createdAt)}`}
              onClick={() => navigate(`/wx/article/${v.id}?channel=self`)}
            >
              {v.title}
            </List.Item>
          ))}
        </StyledList>
      </Main>
    </Container>
  )
}

export default WxPage
