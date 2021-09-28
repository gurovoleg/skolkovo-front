import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import classNames from 'classnames'

const menuItem = 'second-menu-link d-inline-block text_black text_md pad-btm_sm mar-right_lg text_regular'
const activeMenuItem = 'text_medium second-menu-link_active'

const MenuNavItem = ({ to, exact, active, children, className, ...rest }) => {
  // Кнопка
  if (!to) {
    return (
      <div className={classNames('link', menuItem, className, { [activeMenuItem]: active })} {...rest}>
        {children}
      </div>
    )
  }

  // Ссылка
  return (
    <Route
      path={to}
      exact={exact}
      children={({ location }) => (
        <Link to={to} className={classNames(menuItem, className, { [activeMenuItem]: location.pathname.includes(to) })} {...rest}>
          {children}
        </Link>
      )}
    />
  )
}

MenuNavItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired
}

export default MenuNavItem
