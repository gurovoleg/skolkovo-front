import React from 'react'
import FormGroup from './FormGroup'
import { Checkbox as CheckboxInput } from './Inputs'

const Checkbox = ({ label, disabled, ...rest }) => {
  // disabled вынимаем и пробрасываем мимо обертки, так как в FormGroup ипользуется для других контролов
  // в этом случае у чекбокса свой label, для которого задается класс form_disabled
  return (
    <FormGroup {...rest}>
      <CheckboxInput label={label} disabled={disabled} />
    </FormGroup>
  )
}

export default Checkbox
