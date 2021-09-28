import React from 'react'
import { connect } from 'react-redux'
import { rolesSelector } from 'Selectors'
import { Table } from './components'

const Roles = (props) => <Table {...props} />

const mapStateToProps = state => ({
  items: rolesSelector(state)
})

export default connect(mapStateToProps)(Roles)
