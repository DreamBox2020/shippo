import { Button, Form, Input, List, Image, NavBar, Toast } from 'antd-mobile'
import { useLocation, useNavigate } from 'react-router'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import { useSearchParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { WhiteSpace } from '~/components/white-space'
import { StyledList } from '.'
import { services } from '@shippo/sdk-services'
import { __wxArticleExtOffiaccountNickname } from '@shippo/types'

import { BASE_API } from '~/settings'

const __defaultWxArticleExtOffiaccountNickname = __wxArticleExtOffiaccountNickname()

export const WxEditPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [url, setUrl] = useState('')

  // 从服务器获取的文章信息
  const [article, setArticle] = useState(__defaultWxArticleExtOffiaccountNickname)

  const [searchParams, setSearchParams] = useSearchParams()

  // 从url中获取的文章id，如果有，就是更新，反之，新建。
  const articleId = useMemo(() => {
    const str = searchParams.get('article_id') || ''
    const num = parseInt(str)
    return isNaN(num) ? 0 : num
  }, [searchParams])

  const submit = useCallback(async () => {
    if (!url) return

    try {
      if (articleId) {
        await services.wxArticle.update({ url, id: articleId })
        navigate('/wx/manage', { replace: true })
      } else {
        const hr = await services.wxArticle.create({ url })
        console.log(hr.data)

        setUrl('')
        searchParams.set('article_id', String(hr.data.resource.id))
        setSearchParams(searchParams, { replace: true })
      }
    } catch (error: any) {
      Toast.show({
        icon: 'fail',
        content: error.data.message,
      })
    }
  }, [articleId, url, searchParams, setSearchParams, navigate])

  useEffect(() => {
    if (articleId) {
      services.wxArticle.find({ id: articleId }).then((hr) => {
        setArticle(hr.data.resource)
      })
    }
  }, [articleId])

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
        <NavBar onBack={() => navigate(-1)}>编辑</NavBar>
      </Header>
      <Main>
        <div style={{ padding: '20px 10px 10px 10px' }}>
          <Form layout="vertical">
            <Form.Item label="文章链接">
              <Input
                placeholder="请输入文章链接"
                clearable
                value={url}
                onChange={(value) => setUrl(value)}
              />
            </Form.Item>
          </Form>

          <WhiteSpace size={15} />

          <Button block color="primary" size="middle" onClick={submit}>
            {articleId ? '发表' : '创建草稿'}
          </Button>

          <WhiteSpace size={15} />
          {article.id ? (
            <Form layout="vertical">
              <Form.Item label="小程序路径">
                <Input value={'/pages/index?article_id=' + article.id} />
              </Form.Item>
            </Form>
          ) : null}
        </div>

        {article.id ? (
          <StyledList mode="card" header="预览">
            <List.Item
              clickable
              extra={
                <Image
                  src={BASE_API + '/file' + article.image2}
                  fit="cover"
                  width={141}
                  height={60}
                />
              }
              description={article.offiaccountNickname}
            >
              {article.title}
            </List.Item>
          </StyledList>
        ) : null}
      </Main>
    </Container>
  )
}

export default WxEditPage
