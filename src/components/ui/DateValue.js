import React from 'react'
import classNames from 'classnames'
import { momentFromDate } from 'Utils/date'
import Value from "./Value"

const DateValue = ({ value, format, className, text }) => {
  if (value) {
    return (
      <span className={classNames('text-nowrap', className)}>
        {momentFromDate(value).format(format || 'YYYY-MM-DD')}
      </span>
    )
  }
  return <span className={classNames('text-nowrap text_purple', className)}>{text}</span>

}

DateValue.defaultProps = {
  text: 'не указано',
}

export default DateValue
