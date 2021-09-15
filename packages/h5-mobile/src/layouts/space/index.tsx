import React from 'react'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import { WhiteSpace } from '~/components/white-space'

export const Space = () => {
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
        个人中心
      </Header>
      <WhiteSpace size={15} />
      <Main></Main>
    </Container>
  )
}

export default Space
