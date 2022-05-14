import React from 'react'
import { Button, List } from 'antd-mobile'
import { Container } from '~/components/container'
import { Header } from '~/components/header'
import { Main } from '~/components/main'
import { WhiteSpace } from '~/components/white-space'
import { BellOutlined, ProfileOutlined, SettingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'

export const Setting = () => {
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
        设置
      </Header>
      <WhiteSpace size={15} />
      <Main>
        <List>
          <List.Item onClick={() => {}}>编辑资料</List.Item>
          <List.Item onClick={() => {}}>账号与安全</List.Item>
        </List>
        <WhiteSpace size={15} />
        <Button
          block
          size="large"
          style={{ '--border-radius': '0px' }}
          onClick={() => {
            localStorage.removeItem('__PASSPORT')
            history('/')
          }}
        >
          退出登录
        </Button>
      </Main>
    </Container>
  )
}

export default Setting
