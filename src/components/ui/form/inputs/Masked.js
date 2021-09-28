import React from 'react'
import FormGroup from './FormGroup'
import { Masked as MaskedInput } from './Inputs'
import classNames from 'classnames'

const Masked = (props) => {
  const { id, name, label, labelOptions = {} } = props
  return (
    <FormGroup {...props}>
      <MaskedInput
        id={labelOptions.htmlFor || id || name}
        className={classNames('form-input text_md', {
          'form-input_enhanced': label && (!labelOptions || !labelOptions.relative)
      })} />
    </FormGroup>
  )
}

export default Masked
