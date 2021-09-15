import React from 'react'
import { Card } from 'antd-mobile'
import { Container } from '~/components/container'
import { Header } from '~/components/header'
import { Main } from '~/components/main'
import { UserInfoCard } from './components/user-info-card'

export const My = () => {
  return (
    <Container direction="vertical">
      <Header height="45px">{/* <NavBar mode="light">我</NavBar> */}</Header>
      <Main>
        <Card>
          <UserInfoCard />
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Card>
      </Main>
    </Container>
  )
}

export default My
