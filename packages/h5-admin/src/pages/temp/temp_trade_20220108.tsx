import { Button, Input, List } from 'antd'
import React from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { services } from '@shippo/sdk-services'

const { TextArea } = Input

export const Page_temp_trade_20220108 = () => {
  const [text, setText] = useState('')
  const [list, setList] = useState<string[]>([])

  const qqList = useMemo(() => text.split(','), [text])

  const find = useCallback(async () => {
    const hr = await services.temp.temp_trade_20220108__find_no_exist({
      list: qqList,
    })
    console.log(qqList)
    console.log(hr.data)
    setList(hr.data.resource)
  }, [qqList])

  return (
    <div>
      <h1>查询没有完成订单的用户</h1>
      <TextArea rows={4} value={text} onChange={(event) => setText(event.target.value)} />
      <Button type="primary" onClick={find}>
        查询
      </Button>
      <Button
        onClick={() => {
          setText('')
          setList([])
        }}
      >
        清除
      </Button>
      <List
        style={{ backgroundColor: '#fff' }}
        bordered
        dataSource={list}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  )
}

export default Page_temp_trade_20220108
