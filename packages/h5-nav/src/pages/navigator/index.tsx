import React, { useState } from 'react'
import { Input, AutoComplete } from 'antd'
import { SelectProps } from 'antd/es/select'
import styled from 'styled-components'
import jsonp from '@alicloud/fetcher-jsonp'
import { useDebounceFn } from 'ahooks'

import background from '~/assets/background.jpg'

const StyledSearch = styled(Input.Search)`
  &.ant-input-search .ant-input-wrapper .ant-input-affix-wrapper {
    border: 2px solid #4569ff !important;
    border-radius: 10px 0 0 10px !important;
    box-shadow: unset;
    border-right-width: 2px !important;
  }
  .ant-input-group-addon {
    background-color: #4569ff;
    border-radius: 0 10px 10px 0 !important;
  }
  .ant-btn {
    border: 2px solid #4569ff !important;
    background: #4569ff;
    border-radius: 0 10px 10px 0 !important;
  }
`

const Complete: React.FC = () => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([])

  const { run: handleSearch } = useDebounceFn(
    (value: string) => {
      if (!value) return
      jsonp<any>('https://www.baidu.com/sugrec?prod=pc&wd=' + value, { jsonpCallback: 'cb' })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          if (res && res.g && Array.isArray(res.g)) {
            res = res.g.map((r: any) => ({
              value: r.q,
              label: (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>
                    <a
                      href={`https://www.baidu.com/s?ie=utf-8&wd=${r.q}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {r.q}
                    </a>
                  </span>
                </div>
              ),
            }))

            setOptions(res)
          } else {
            setOptions([])
          }
        })
    },
    {
      wait: 500,
    }
  )

  const onSelect = (value: string) => {
    console.log('onSelect', value)
  }

  return (
    <div style={{ textAlign: 'center', height: '40%', position: 'relative' }}>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{
          width: 650,
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <StyledSearch
          size="large"
          enterButton="百度一下"
          allowClear
          onSearch={(value, event) => {
            console.log(value, event)
            if (!value) return
            window.open('https://www.baidu.com/s?ie=utf-8&wd=' + value)
          }}
        />
      </AutoComplete>
    </div>
  )
}

export const NavigatorPage = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: 'url(' + background + ')',
      }}
    >
      <Complete />
    </div>
  )
}

export default NavigatorPage
