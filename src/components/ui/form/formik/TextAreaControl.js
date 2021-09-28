import React from 'react'
import { TextArea } from '../inputs'
import withField from './hoc/withField'

const TextAreaControl = (props) => <TextArea {...props} />

export default withField(TextAreaControl)
