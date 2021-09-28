import React from 'react'
import { connect } from 'react-redux'
import { withRemoteData, UserForm, userSchema } from 'Components'
import { actions } from 'Reducers/auth'
import { profileInitialStateSelector } from 'Selectors/user'
import { withRouter } from 'react-router-dom'

const ProfileEdit = (props) => <UserForm {...props} />

const mapStateToProps = (state, props) => ({
  type: 'update',
  schema: userSchema('update'),
  initialValues: profileInitialStateSelector(state, props)
})

const mapDispatchToProps = dispatch => ({
  submit: (payload, formBag) => dispatch({ ...actions.updateProfile(payload), formBag })
})

export default withRouter(withRemoteData({
  url: '/user/profile', entity: 'user'
})(connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)))