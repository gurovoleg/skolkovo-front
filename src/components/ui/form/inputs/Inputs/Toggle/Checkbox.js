import React from 'react'
import classNames from 'classnames'

const Input = ({ id, name, label, title, ...rest }) => {
  return (
    <label className={classNames('checkbox', { form_disabled: rest.disabled })} title={title || label}>
      {label && <span className="checkbox-title">{label}</span>}
      <input name={name} type="checkbox" checked={rest.checked || rest.value} {...rest} />
      <span className="checkbox-checkmark" />
    </label>
  )
}

export default Input
