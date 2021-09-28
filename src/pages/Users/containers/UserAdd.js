import React from 'react'
import { connect } from 'react-redux'
import { UserForm, userSchema } from 'Components'
import { actions } from 'Reducers/user'
import { userAddInitialStateSelector } from 'Selectors/user'
import { withRouter } from 'react-router-dom'

const UserAdd = (props) => <UserForm {...props} />

const mapStateToProps = (state, props) => ({
  type: 'add',
  schema: userSchema('add'),
  initialValues: userAddInitialStateSelector(state, props)
})

const mapDispatchToProps = dispatch => ({
  submit: (payload, formBag) => dispatch({ ...actions.userCreate(payload), formBag })
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserAdd))