import { Card, Icon } from 'antd-mobile'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Level } from '~/components'

const StyledUserInfoCard = styled(Card.Header)`
  &.am-card-header {
    font-size: 14px;
    .am-card-header-content {
      flex: 9;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .am-card-header-extra {
      flex: 1;
    }
  }
`

const StyledInfoBlock = styled.span`
  font-size: 12px;
  color: #999;
  margin-right: 10px;
`

export const UserInfoCard = () => {
  const history = useHistory()

  return (
    <StyledUserInfoCard
      title={
        <div>
          <p>
            系统保留内测专用帐号<Level>9</Level>
          </p>
          <p>
            <StyledInfoBlock>经验：99999</StyledInfoBlock>
            <StyledInfoBlock>积分：99999</StyledInfoBlock>
          </p>
        </div>
      }
      thumb={require('~/assets/avatar.png')}
      extra={<Icon type="right" size="md" onClick={() => history.push('/space/100000')} />}
    />
  )
}

export default UserInfoCard
