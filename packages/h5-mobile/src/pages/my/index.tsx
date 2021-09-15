import React from 'react'
import { List } from 'antd-mobile'
import { Container } from '~/components/container'
import { Header } from '~/components/header'
import { Main } from '~/components/main'
import { WhiteSpace } from '~/components/white-space'
import { UserInfoCard } from './components/user-info-card'
import { BellOutlined, ProfileOutlined, SettingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'

export const My = () => {
  const history = useHistory()

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
        我
      </Header>
      <WhiteSpace size={15} />
      <Main>
        <UserInfoCard />
        <WhiteSpace size={15} />
        <List>
          <List.Item prefix={<BellOutlined />} onClick={() => {}}>
            通知
          </List.Item>
          <List.Item prefix={<ProfileOutlined />} onClick={() => {}}>
            我的作品
          </List.Item>
          <List.Item prefix={<SettingOutlined />} onClick={() => history.push('/setting')}>
            设置
          </List.Item>
        </List>
      </Main>
    </Container>
  )
}

export default My
