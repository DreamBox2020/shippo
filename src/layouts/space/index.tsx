import React from 'react'
import { Icon, List, NavBar } from 'antd-mobile'
import { Container } from '~/components/container'
import { Header } from '~/components/header'
import { Main } from '~/components/main'

const { Item } = List
const { Brief } = Item

export const Space = () => {
  return (
    <Container direction="vertical">
      <Header height="45px">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >
          NavBar
        </NavBar>
      </Header>
      <Main>
        <List renderHeader={() => '被赞9999+次，被收藏9999+次。'} className="my-list">
          <div>
            <img width="100%" src={require('~/assets/bg.jpg').default} alt="" />
          </div>
          <Item arrow="horizontal" multipleLine onClick={() => {}}>
            Title <Brief>subtitle</Brief>
          </Item>
          <Item arrow="horizontal" multipleLine onClick={() => {}} platform="android">
            ListItem （Android）
            <Brief>
              There may have water ripple effect of <br /> material if you set the click event.
            </Brief>
          </Item>
          <Item
            arrow="horizontal"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            multipleLine
            onClick={() => {}}
          >
            Title <Brief>subtitle</Brief>
          </Item>
          <Item arrow="horizontal" multipleLine onClick={() => {}}>
            Title <Brief>subtitle</Brief>
          </Item>
          <Item arrow="horizontal" multipleLine onClick={() => {}} platform="android">
            ListItem （Android）
            <Brief>
              There may have water ripple effect of <br /> material if you set the click event.
            </Brief>
          </Item>
          <Item
            arrow="horizontal"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            multipleLine
            onClick={() => {}}
          >
            Title <Brief>subtitle</Brief>
          </Item>
        </List>
      </Main>
    </Container>
  )
}

export default Space
