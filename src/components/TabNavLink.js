import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import classNames from 'classnames'

const TabNavLink = ({ to, exact, children, isActive }) => {
  return (
    <Route
      path={to}
      exact={exact}
      children={({ match, location }) => {
        return <Link to={to} className={classNames('tab-item', { 'tab-item_active': isActive ? isActive(location.pathname) : match })}>
        {/*return <Link to={to} className={classNames('tab-item', { 'tab-item_active': match ? isActive ? isActive(match.path) : match : false })}>*/}
          {children}
        </Link>
      }}
    />
  )
}

TabNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired
}

export default TabNavLink
