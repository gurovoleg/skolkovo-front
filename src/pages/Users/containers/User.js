import React from 'react'
import { connect } from 'react-redux'
import { userSelector, profileSelector } from 'Selectors/user'
import { withRemoteData, User as UserComponent } from 'Components'
import { withRouter } from 'react-router-dom'
import { actions } from 'Reducers/user'

const User = (props) => <UserComponent {...props} />

const mapStateToProps = (state, props) => ({
  user: userSelector(state, props), // пользователь из url
  profile: profileSelector(state) // профайл залогиненного пользователя
})

const mapDispatchToProps = (dispatch, props) => ({
  deleteUser: () => dispatch({ ...actions.userDelete(props.match.params.userId) })
})

export default withRouter(withRemoteData({
  url: ({ match }) => `/user/${match.params.userId}/profile`, entity: 'user'
})(connect(mapStateToProps, mapDispatchToProps)(User)))