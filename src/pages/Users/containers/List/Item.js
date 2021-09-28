import React from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

const Item = ({ user, selectable, selected, onChange, profileId }) => {
  const userLink = profileId === user.id ? '/profile' : `/users/${user.id}`

  return (
    <div className="row table-stripe-item wrap-inner_wide pad-top_sm pad-btm_sm">

      {selectable && <input type="checkbox" className="checkbox-row" checked={selected} onChange={() => onChange(user.id)} />}

      <div className="col-md-1">
        <div>{user.id}</div>
      </div>
      <div className="col-md-3">
        <Link className="text_md text_medium text_purple" to={userLink}>
          {user.name} {user.surname}
        </Link>
      </div>
      <div className="col-md-3">
        <div>{user.email}</div>
      </div>
      <div className="col-md-3">
        <div className="text_regular">{user.workshop}</div>
      </div>
      <div className="col-md-2">
        <div>{user.unit}</div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profileId: state.auth.id
})

export default connect(mapStateToProps)(Item)
