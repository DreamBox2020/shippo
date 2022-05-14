import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { List, Image } from 'antd-mobile'
import { Level } from '~/components/level'

import avatar from '~/assets/avatar.png'

const StyledInfoBlock = styled.span`
  font-size: 12px;
  color: #999;
  margin-right: 10px;
`

export const UserInfoCard = () => {
  const history = useNavigate()

  return (
    <List>
      <List.Item
        prefix={
          <Image
            src={avatar}
            style={{ borderRadius: '25px' }}
            fit="cover"
            width="50px"
            height="50px"
          />
        }
        description={
          <p>
            <StyledInfoBlock>经验：99999</StyledInfoBlock>
            <StyledInfoBlock>积分：99999</StyledInfoBlock>
          </p>
        }
        onClick={() => history('/space/100000')}
      >
        内测账号001<Level>9</Level>
      </List.Item>
    </List>
  )
}

export default UserInfoCard
