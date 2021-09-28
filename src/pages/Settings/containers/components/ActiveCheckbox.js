import React from 'react'
import classNames from "classnames"

const ActiveCheckBox = ({ item, setActive }) => {
  return (
    <input
      type="checkbox"
      title="Активировать"
      className={classNames('cursor-pointer', { 'no-events': ['active', 'completed'].includes(item.status) })}
      checked={item.status === 'active'}
      onChange={() => setActive(item)}/>
  )
}

export default ActiveCheckBox
