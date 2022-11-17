import React from 'react'
import { List } from 'antd-mobile'
import { Container } from '~/components/container'
import { Header } from '~/components/header'
import { Main } from '~/components/main'
import { WhiteSpace } from '~/components/white-space'
import { UserInfoCard } from './components/user-info-card'
import {
  BellOutlined,
  PictureOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router'

export const My = () => {
  const history = useNavigate()

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
          <List.Item
            prefix={<PictureOutlined />}
            onClick={() => history('/album')}
          >
            我的相簿
          </List.Item>
          <List.Item
            prefix={<SettingOutlined />}
            onClick={() => history('/setting')}
          >
            设置
          </List.Item>
        </List>
      </Main>
    </Container>
  )
}

export default My
