import { Card, NavBar } from 'antd-mobile'
import React from 'react'
import { Container, Header, Main } from '~/components'
import UserInfoCard from './components/user-info-card'

export const My = () => {
  return (
    <Container direction="vertical">
      <Header height="45px">
        <NavBar mode="light">我</NavBar>
      </Header>
      <Main>
        <Card full>
          <UserInfoCard />
          <Card.Body>
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </Card.Body>
        </Card>
      </Main>
    </Container>
  )
}

export default My
