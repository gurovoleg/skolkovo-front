import React, { useState, useEffect, useRef } from 'react'
import { Icon, Transition } from 'semantic-ui-react'
import { Menu, UserName } from 'Components/ui'

const menuItems = [
  { label: 'Профиль', link: '/profile', icon: 'user' },
  { label: 'Выход', link: '/logout', icon: 'sign out alternate' },
]

const UserMenu = ({ profile }) => {

  const [active, setActive] = useState(false)
  const menuRef = useRef(null)
  const triggerRef = useRef(null)

  const handleClick = (e) => {
    if (!active && triggerRef.current.contains(e.target)) {
      setActive(true)
    } else if (active) {
      setActive(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  })

  return (

    <div className="user-menu">

      <div className="user-menu__info" ref={triggerRef}>
        <Icon name="user circle" className="text_lg"/>
        <UserName className="user-menu__name text_bold text_md pad-left_md pad-right_md" user={profile} short={false} />
        <Icon name="angle down" className="text_lg"/>
      </div>

      <Transition visible={active} animation="fade down" duration={500}>
        <div className="user-menu__dropdown" ref={menuRef}>
          <Menu items={menuItems} className="shadow" />
        </div>
      </Transition>

    </div>
  )
}

export default UserMenu
