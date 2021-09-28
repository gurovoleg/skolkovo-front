import React from 'react'
import { Logo, UserMenu } from 'Components'
import { connect } from 'react-redux'
import { profileSelector } from "Selectors/user"
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

const Header = ({ profile, modalBag }) => {
  return (
    <div className="header pad-top_lg pad-btm_lg">

      <div className="d-flex align-items-center justify-content-between">

        <Icon className="header-menu-button" name="bars" size="large" onClick={modalBag.open}/>

        <Link to="/" className="header-logo">
          <Logo size="25px" classes="align-center" textClasses={{ title: 'text_lg', subTitle: 'text_xss' }}/>
        </Link>

        <UserMenu profile={profile}/>
      </div>

    </div>
  )
}

const mapStateToProps = state => ({
  profile: profileSelector(state)
})

export default connect(mapStateToProps)(Header)
