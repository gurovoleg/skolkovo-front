import React from 'react'
import { connect } from 'react-redux'
import { withRemoteData, UserForm, userSchema } from 'Components'
import { actions } from 'Reducers/user'
import { userEditInitialStateSelector } from 'Selectors/user'
import { withRouter } from 'react-router-dom'

const User = (props) => <UserForm {...props} />

const mapStateToProps = (state, props) => ({
  type: 'update',
  schema: userSchema('update'),
  initialValues: userEditInitialStateSelector(state, props)
})

const mapDispatchToProps = dispatch => ({
  submit: (payload, formBag) => dispatch({ ...actions.userUpdate(payload), formBag })
})

export default withRouter(withRemoteData({
  url: ({ match }) => `/user/${match.params.userId}/profile`, entity: 'user'
})(connect(mapStateToProps, mapDispatchToProps)(User)))