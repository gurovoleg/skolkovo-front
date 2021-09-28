import React from 'react'
import { Icon } from "semantic-ui-react"

const Label = ({ name, icon }) => {
  return (
    <div className="text_lg text_bold pad-btm_md">
      <Icon name={icon} className="mar-right_sm"/>
      {name}
    </div>
  )
}

export default Label
