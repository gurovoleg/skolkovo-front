import React from 'react'
import { Radio } from '../inputs'
import withField from './hoc/withField'

const RadioControl = (props) => <Radio {...props} />

export default withField(RadioControl)
