import React from 'react'
import FormGroup from './FormGroup'
import { Select as SelectInput } from './Inputs'

const Select = (props) => {
  return (
    <FormGroup {...props}>
      <SelectInput label={props.label} />
    </FormGroup>
  )
}

export default Select
