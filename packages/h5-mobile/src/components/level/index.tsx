import { Badge } from 'antd-mobile'
import React, { PropsWithChildren } from 'react'

export const Level: React.FC<PropsWithChildren<{}>> = (props) => {
  return (
    <Badge
      content={`LV${props.children}`}
      style={{ marginLeft: '12px', padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }}
    />
  )
}

export default Level
