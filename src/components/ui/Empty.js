import React from 'react'
import { Wrap } from './index'
import classNames from "classnames"

const Empty = ({ message = 'Нет данных', classname }) => {
  return (
    <Wrap>
      <div className={classNames('text_center text_regular text_md', classname)}>{message}</div>
    </Wrap>
  )
}

export default Empty
