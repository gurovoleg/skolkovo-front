import React from 'react'
import FormGroup from './FormGroup/index'
import { Password as PasswordInput } from './Inputs'
import classNames from 'classnames'

const Password = (props) => {
  const { id, name, label, labelOptions = {} } = props
  return (
    <FormGroup {...props}>
      <PasswordInput
        id={labelOptions.htmlFor || id || name}
        className={classNames('form-input text_md', {
          'form-input_enhanced': label && (!labelOptions || !labelOptions.relative)
      })} />
    </FormGroup>
  )
}

export default Password
