import React from 'react'
import { Button, Input, List, NoticeBar, Tabs, Toast } from 'antd-mobile'
import { Container } from '~/components/container'
import { Header } from '~/components/header'
import { Main } from '~/components/main'
import { WhiteSpace } from '~/components/white-space'
import { useNavigate } from 'react-router'
import { COLOR_PINK } from '~/constants/color'
import { useState } from 'react'
import { useCallback } from 'react'
import { services } from '@shippo/sdk-services'
import { checkPhone, checkQQ } from '@shippo/sdk-utils'

export const Page_temp_trade_20220108 = () => {
  const history = useNavigate()

  const [trade1, setTrade1] = useState('')
  const [trade2, setTrade2] = useState('')
  const [qq, setQQ] = useState('')
  const [phone, setPhone] = useState('')

  const add = useCallback(async () => {
    try {
      if (!checkQQ(qq)) {
        Toast.show({
          icon: 'fail',
          content: 'QQ格式不正确'
        })
        return
      }

      if (!checkPhone(phone)) {
        Toast.show({
          icon: 'fail',
          content: '手机号格式不正确'
        })
        return
      }

      if (trade1 === '') {
        Toast.show({
          icon: 'fail',
          content: '定金单号不能为空'
        })
        return
      }

      const { data } = await services.temp.temp_trade_20220108__add({
        trade1,
        trade2,
        qq,
        phone
      })

      if (data.success) {
        Toast.show({
          icon: 'success',
          content: data.message
        })
      }
    } catch (error) {
      Toast.show({
        icon: 'fail',
        content: (error as any).data.message
      })
    }
  }, [phone, qq, trade1, trade2])

  const find = useCallback(async () => {
    if (!checkQQ(qq)) {
      Toast.show({
        icon: 'fail',
        content: 'QQ格式不正确'
      })
      return
    }

    const { data } = await services.temp.temp_trade_20220108__find({
      qq
    })

    const count = data.resource.reduce((count, item) => count + item.amount, 0)

    Toast.show({
      icon: 'success',
      content: `该账号下，有${data.resource.length}笔订单，金额共${count}元。`
    })
  }, [qq])

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
        订单查询与录入
      </Header>
      <WhiteSpace size={15} />
      <Main>
        <Tabs>
          <Tabs.Tab title="查询订单" key="query">
            <List>
              <List.Item prefix="QQ号">
                <Input
                  placeholder="请输入QQ号"
                  clearable
                  value={qq}
                  onChange={setQQ}
                />
              </List.Item>
              <List.Item
                style={{
                  backgroundColor: '#f5f5f9'
                }}
              >
                <Button
                  block
                  style={{ background: COLOR_PINK, color: '#fff' }}
                  size="large"
                  onClick={find}
                >
                  查询
                </Button>
              </List.Item>
            </List>
          </Tabs.Tab>
          <Tabs.Tab title="录入订单" key="add">
            <NoticeBar
              content="若是全款，则订单号填到定金中，第二项不填写。"
              color="info"
            />
            <List>
              <List.Item prefix="定金单号">
                <Input
                  placeholder="请输入定金单号"
                  clearable
                  value={trade1}
                  onChange={setTrade1}
                />
              </List.Item>
              <List.Item prefix="补款单号">
                <Input
                  placeholder="请输入补款单号"
                  clearable
                  value={trade2}
                  onChange={setTrade2}
                />
              </List.Item>
              <List.Item prefix="手机号">
                <Input
                  placeholder="请输入手机号"
                  clearable
                  value={phone}
                  onChange={setPhone}
                />
              </List.Item>
              <List.Item prefix="QQ号">
                <Input
                  placeholder="请输入QQ号"
                  clearable
                  value={qq}
                  onChange={setQQ}
                />
              </List.Item>
              <List.Item
                style={{
                  backgroundColor: '#f5f5f9'
                }}
              >
                <Button
                  block
                  style={{ background: COLOR_PINK, color: '#fff' }}
                  size="large"
                  onClick={add}
                >
                  录入
                </Button>
              </List.Item>
            </List>
          </Tabs.Tab>
        </Tabs>
      </Main>
    </Container>
  )
}

export default Page_temp_trade_20220108
