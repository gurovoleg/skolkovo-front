import React from 'react'

const Column = ({ column }) => (
  <div className={column.size}>
    <span className="text_sm text_bold">{column.title}</span>
  </div>
)

export default Column