import React from 'react'
import { Masked } from '../inputs'
import withField from './hoc/withField'
import { conformToMask } from 'text-mask-core'

const MaskedControl = ({ formikBag, customOnChange, onChange, ...props }) => {
  const _onChange = (e) => {
    return formikBag.setValue(conformToMask(e.target.value, props.mask, { guide: false }).conformedValue)
  }

  return (
    <Masked
      {...props}
      onChange={customOnChange ? onChange : _onChange}
    />
  )
}

export default withField(MaskedControl)
