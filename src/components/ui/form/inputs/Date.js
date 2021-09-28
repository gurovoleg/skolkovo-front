import React from 'react'
import FormGroup from './FormGroup'
import { Date as DateComponent } from './Inputs'
import classNames from 'classnames'

const Date = (props) => {
  const { id, name, label, labelOptions = {} } = props
  return (
    <FormGroup {...props}>
      <DateComponent
        id={labelOptions.htmlFor || id || name}
        className={classNames('form-input text_md', {
          'form-input_enhanced': label && (!labelOptions || !labelOptions.relative)
      })} />
    </FormGroup>
  )
}

export default Date
