import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { List, Image } from 'antd-mobile'
import { Level } from '~/components/level'

import avatar from '~/assets/avatar.png'
import { userSelector } from '@shippo/sdk-stores'
import { useSelector } from 'react-redux'

const StyledInfoBlock = styled.span`
  font-size: 12px;
  color: #999;
  margin-right: 10px;
`

export const UserInfoCard = () => {
  const history = useNavigate()
  const userInfo = useSelector(userSelector.infoGetter())

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
            <StyledInfoBlock>经验：{userInfo.user.exp}</StyledInfoBlock>
            <StyledInfoBlock>积分：{userInfo.user.coin}</StyledInfoBlock>
          </p>
        }
        onClick={() => history('/space/' + userInfo.uid)}
      >
        {userInfo.user.nickname || '暂无昵称'}
        <Level>1</Level>
      </List.Item>
    </List>
  )
}

export default UserInfoCard
