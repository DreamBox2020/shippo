import { List, Image, Button } from 'antd-mobile'
import avatar from '~/assets/avatar.png'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import { StyledList } from '.'

export const WxManagePage = () => {
  const users = [
    {
      id: '1',
      avatar: avatar,
      name: '文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题',
      description: '二次元趣闻    2022/06/13 12:00',
    },
    {
      id: '2',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻    2022/06/13 12:00',
    },
    {
      id: '3',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻    2022/06/13 12:00',
    },
    {
      id: '4',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻    2022/06/13 12:00',
    },
    {
      id: '5',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻    2022/06/13 12:00',
    },
    {
      id: '6',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻    2022/06/13 12:00',
    },
    {
      id: '7',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻    2022/06/13 12:00',
    },
    {
      id: '8',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻    2022/06/13 12:00',
    },
    {
      id: '9',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻    2022/06/13 12:00',
    },
    {
      id: '10',
      avatar: avatar,
      name: '文章标题',
      description: '二次元趣闻    2022/06/13 12:00',
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
        管理
      </Header>
      <Main>
        <div style={{ padding: '20px 10px 10px 10px' }}>
          <Button block color="primary" size="middle">
            发表
          </Button>
        </div>

        <List mode="card" header="草稿">
          {users.slice(5).map((user) => (
            <List.Item key={user.id} clickable description={user.description}>
              {user.name}
            </List.Item>
          ))}
        </List>

        <StyledList mode="card" header="已发表内容">
          {users.map((user) => (
            <List.Item
              key={user.id}
              clickable
              extra={<Image src={user.avatar} fit="cover" width={141} height={60} />}
              description={user.description}
            >
              {user.name}
            </List.Item>
          ))}
        </StyledList>
      </Main>
    </Container>
  )
}

export default WxManagePage
