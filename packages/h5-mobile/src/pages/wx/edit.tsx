import { Button, Form, Input, List, Image, NavBar } from 'antd-mobile'
import { useLocation, useNavigate } from 'react-router'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import { WhiteSpace } from '~/components/white-space'
import avatar from '~/assets/avatar.png'
import { StyledList } from '.'

export const WxEditPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const article = useMemo(() => {
    const str = searchParams.get('article_id') || ''
    const num = parseInt(str)
    return isNaN(num) ? 0 : num
  }, [searchParams])

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
              <Input placeholder="请输入文章链接" clearable />
            </Form.Item>
          </Form>

          <WhiteSpace size={15} />

          <Button block color="primary" size="middle">
            {article ? '发表' : '创建草稿'}
          </Button>

          <WhiteSpace size={15} />

          <Form layout="vertical">
            <Form.Item label="小程序路径">
              <Input value="/pages/index?article_id=123456" />
            </Form.Item>
          </Form>
        </div>

        <StyledList mode="card" header="预览">
          <List.Item
            clickable
            extra={<Image src={avatar} fit="cover" width={141} height={60} />}
            description="二次元趣闻 "
          >
            文章标题 文章标题 文章标题 文章标题 文章标题 文章标题
          </List.Item>
        </StyledList>
      </Main>
    </Container>
  )
}

export default WxEditPage
