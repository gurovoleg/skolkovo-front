import React from 'react'

const ValueWithLabel = ({ label, value }) => {
  return (
    <div>
      <div className="text_sm text_bold mar-btm_xs">{label}</div>
      <div className="text_md text_light">{value}</div>
    </div>
  )
}

export default ValueWithLabel

