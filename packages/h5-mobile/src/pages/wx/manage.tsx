import { IWxArticleExtOffiaccountNickname, services } from '@shippo/sdk-services'
import { formatTimeStr } from '@shippo/sdk-utils'
import { List, Image, Button } from 'antd-mobile'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import { BASE_API } from '~/settings'
import { StyledList } from '.'

export const WxManagePage = () => {
  const navigate = useNavigate()

  const [articleAll, setArticleAll] = useState<IWxArticleExtOffiaccountNickname[]>([])

  const articles = useMemo(() => {
    return articleAll.filter((v) => v.url)
  }, [articleAll])

  const tempArticles = useMemo(() => {
    return articleAll.filter((v) => !v.url)
  }, [articleAll])

  useEffect(() => {
    services.wxArticle.find_all_by_wx_passport().then((hr) => {
      setArticleAll(hr.data.resource)
    })
  }, [])

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
        管理
      </Header>
      <Main>
        <div style={{ padding: '20px 10px 10px 10px' }}>
          <Button block color="primary" size="middle" onClick={() => navigate('/wx/edit')}>
            发表
          </Button>
        </div>

        <List mode="card" header="草稿">
          {tempArticles.map((v) => (
            <List.Item
              key={v.id}
              clickable
              description={`${v.offiaccountNickname} ${formatTimeStr(v.createdAt)}`}
              onClick={() => {
                navigate('/wx/edit?article_id=' + v.id)
              }}
            >
              {v.title}
            </List.Item>
          ))}
        </List>

        <StyledList mode="card" header="已发表内容">
          {articles.map((v) => (
            <List.Item
              key={v.id}
              clickable
              extra={
                <Image src={BASE_API + '/file' + v.image2} fit="cover" width={141} height={60} />
              }
              description={`${v.offiaccountNickname} ${formatTimeStr(v.createdAt)}`}
              onClick={() => {
                navigate('/wx/article/' + v.id + '?channel=manage')
              }}
            >
              {v.title}
            </List.Item>
          ))}
        </StyledList>
      </Main>
    </Container>
  )
}

export default WxManagePage
