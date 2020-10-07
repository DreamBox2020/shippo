import { Card, Icon, NavBar } from 'antd-mobile'
import React from 'react'
import styled from 'styled-components'
import { Container, Header, Main } from '~/components'

const StyledCard = styled(Card)`
  .am-card-header {
    font-size: 14px;
    .am-card-header-content {
      flex: 7;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .am-card-header-extra {
      flex: 3;
    }
  }
`

export const My = () => {
  return (
    <Container direction="vertical">
      <Header height="45px">
        <NavBar mode="light">我</NavBar>
      </Header>
      <Main>
        <StyledCard full>
          <Card.Header
            title="系统保留内测专用帐号"
            thumb={require('~/assets/tb-500x500-h.png')}
            extra={<Icon type="right" size="md" />}
          />
          <Card.Body>
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </Card.Body>
        </StyledCard>
      </Main>
    </Container>
  )
}

export default My
