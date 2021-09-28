import React from 'react'
import { Text } from '../inputs'
import withField from './hoc/withField'

const TextControl = (props) => <Text type="text" {...props} />

export default withField(TextControl)
