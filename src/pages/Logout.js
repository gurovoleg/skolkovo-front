import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { actions } from 'Reducers/auth'

const Logout = ({ logout }) => {

  useEffect(() => {
    logout()
  }, [])

  return null
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
})

export default connect(null, mapDispatchToProps)(Logout)
