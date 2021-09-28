import React from 'react'
import classNames from "classnames"
import { Link } from "react-router-dom"
import { Icon, Transition } from "semantic-ui-react"
import { withRouter } from 'react-router-dom'
import { filterSearchString } from 'Utils/searchString'

const MenuItem = ({ icon, active, label, link, className, subItems, location, enabled }) => {

  // для определения активного элемента подменю удаляем стандартные параметры адресной строки (page, perPage, sort),
  // чтобы производить сверку без них, так как они могут отсутстовать/присутствовать
  const isSubItemActive = (link, location) => {
    const filteredSearchString = filterSearchString(location.search)
    const path = filteredSearchString ? `${location.pathname}?${filteredSearchString}` : location.pathname
    return path === link
  }

  return (
    <div className={classNames('main-menu-item', { 'main-menu-item__active': active }, className)}>

      <Link to={link} className={classNames('link d-block', { disabled: enabled === false })}>
        {icon && <Icon name={icon} className="mar-right_sm text_sm"/>}
        <span className="main-menu-item__title">{label}</span>

        {subItems && subItems.length > 0 &&
        <div className="main-menu-item__toggle">
          <Icon name={active ? 'angle up' : 'angle down'}/>
        </div>}

      </Link>

      {subItems && subItems.length > 0 && active &&
      <div className={classNames('submenu', { submenu_white: active })}>
        {subItems.map((subItem, idx) => <SubItem active={isSubItemActive(subItem.link, location)} key={idx} {...subItem} />)}
      </div>}

    </div>
  )
}

const SubItem = ({ icon, active, label, link, className }) => (
  <Link to={link} className={classNames('submenu-item link d-block', { 'submenu-item__active': active }, className)}>
    {icon && <Icon name={icon} className="mar-right_sm"/>}
    <span>{label}</span>
  </Link>
)

const Menu = ({ items, className, location }) => {
  return (
    <div className={classNames('main-menu', className)}>
      {items.map((item, idx) =>
        <MenuItem
          key={idx}
          {...item}
          location={location}
          active={location.pathname.startsWith(item.link)}
        />)
      }
    </div>
  )
}

export default withRouter(Menu)

/*active={item.subItems ? location.pathname.startsWith(item.link) : location.pathname === item.link}/>)}*/