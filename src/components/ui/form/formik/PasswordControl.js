import React from 'react'
import { Password } from '../inputs'
import withField from './hoc/withField'

const PasswordControl = (props) => <Password {...props} />

export default withField(PasswordControl)
