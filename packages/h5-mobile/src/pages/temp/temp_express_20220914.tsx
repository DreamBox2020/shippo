import { services } from '@shippo/sdk-services'
import { checkQQ, checkPhone } from '@shippo/sdk-utils'
import { List, Input, Button, Toast, Dialog } from 'antd-mobile'
import { useState } from 'react'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import { WhiteSpace } from '~/components/white-space'
import { COLOR_PINK } from '~/constants/color'

export const Page_temp_express_20220914 = () => {
  const [qq, setQQ] = useState('')
  const [phone, setPhone] = useState('')

  const find = async () => {
    if (!checkQQ(qq)) {
      Toast.show({
        icon: 'fail',
        content: 'QQ格式不正确',
      })
      return
    }

    if (!checkPhone(phone)) {
      Toast.show({
        icon: 'fail',
        content: '手机号格式不正确',
      })
      return
    }

    const { data } = await services.temp.temp_express_20220914__findByQQAndPhone({
      qq,
      phone,
    })

    const tradeList = data.resource

    if (!tradeList.length) {
      Toast.show({
        icon: 'fail',
        content: '没有查到任何数据',
      })
      return
    }

    Dialog.alert({
      content: '订单号：' + tradeList.map((_) => _.tradeId).join('\n'),
    })
  }

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
        订单查询与录入
      </Header>
      <WhiteSpace size={15} />
      <Main>
        <List>
          <List.Item prefix="QQ号">
            <Input placeholder="请输入QQ号" clearable value={qq} onChange={setQQ} />
          </List.Item>
          <List.Item prefix="手机号">
            <Input placeholder="请输入手机号" clearable value={phone} onChange={setPhone} />
          </List.Item>
          <List.Item
            style={{
              backgroundColor: '#f5f5f9',
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
      </Main>
    </Container>
  )
}

export default Page_temp_express_20220914
