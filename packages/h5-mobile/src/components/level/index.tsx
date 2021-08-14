import { Badge } from 'antd-mobile'
import React from 'react'

export const Level: React.FC = (props) => {
  return (
    <Badge
      text={`LV${props.children}`}
      style={{ marginLeft: '12px', padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }}
    />
  )
}

export default Level
