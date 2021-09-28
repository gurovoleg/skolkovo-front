import React from 'react'
import { Checkbox } from '../inputs'
import withField from './hoc/withField'

const CheckboxControl = (props) => <Checkbox {...props} />

export default withField(CheckboxControl)