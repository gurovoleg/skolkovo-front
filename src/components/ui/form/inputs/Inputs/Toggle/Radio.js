import React from 'react'
import classNames from 'classnames'

const Input = ({ id, name, value, label, title, ...rest }) => {
  return (
    <label className={classNames('radio', { form_disabled: rest.disabled })} title={title || label}>
      <span className="radio-title">{label}</span>
      <input name={name} type="radio" value={value} {...rest} />
      <span className="radio-checkmark" />
    </label>
  )
}

export default Input
