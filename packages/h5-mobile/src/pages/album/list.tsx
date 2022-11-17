import { NavBar, Image, List } from 'antd-mobile'
import { AddOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'

export const users = [
  {
    id: '1',
    avatar:
      'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: '默认相簿',
    description: '5 作品',
  },
  {
    id: '2',
    avatar:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
    name: '测试相簿',
    description: '0 作品',
  },
  {
    id: '3',
    avatar:
      'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: '新新新的相簿',
    description: '99999 作品',
  },
]

export const AlbumList = () => {
  const navigate = useNavigate()

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
          right={
            <AddOutline
              style={{ fontSize: 24, verticalAlign: 'middle' }}
              onClick={() => navigate('/album/create')}
            />
          }
          onBack={() => navigate(-1)}
        >
          我的相簿
        </NavBar>
      </Header>
      <Main style={{ padding: 10 }}>
        <List>
          {users.map((user) => (
            <List.Item
              key={user.name}
              prefix={
                <Image
                  src={user.avatar}
                  style={{ borderRadius: 4 }}
                  fit="cover"
                  width={60}
                  height={60}
                />
              }
              description={user.description}
            >
              {user.name}
            </List.Item>
          ))}
        </List>
      </Main>
    </Container>
  )
}

export default AlbumList
