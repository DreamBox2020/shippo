import { userGetters } from '@shippo/sdk-stores'
import React from 'react'
import { useSelector } from 'react-redux'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import { WhiteSpace } from '~/components/white-space'

export const Space = () => {
  const userInfo = useSelector(userGetters.infoGetter())

  return (
    <Container direction="vertical">
      <Header
        style={{
          height: '45px',
          lineHeight: '45px',
          backgroundColor: '#fff',
          textAlign: 'center',
          fontSize: '18px'
        }}
      >
        个人中心
      </Header>
      <WhiteSpace size={15} />
      <Main>
        <h1>UID:{userInfo.uid}</h1>
      </Main>
    </Container>
  )
}

export default Space
