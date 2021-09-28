import React from 'react'
import './layouts.css'
import { Header, BreadCrumbs } from 'Components'
import { Menu } from 'Components/ui'
import { withModal } from 'Components/Modal'
import { Modal } from 'semantic-ui-react'
import { roles } from 'Root/settings'
import { useSelector } from "react-redux"
import { profileSelector } from "Selectors/user"

const menuItems = role => ([
  {
    label: 'Пользователи',
    link: '/users',
    icon: 'users',
    subItems: [
      { label: 'Все', link: '/users' },
      { label: 'Активные', link: '/users?status=active' }
    ],
    enabled: [roles.ADMIN].includes(role)
  },
  { label: 'Вопросы', link: '/questions', icon: 'tasks', enabled: [roles.ADMIN].includes(role) },
  { label: 'Опросники', link: '/quizzes', icon: 'clipboard', enabled: [roles.ADMIN].includes(role) },
  { label: 'Аттестация', link: '/appraisal', icon: 'balance scale', enabled: [roles.ADMIN, roles.USER].includes(role) },
  { label: 'Статистика', link: '/statistics', icon: 'chart line', enabled: [roles.ADMIN, roles.USER].includes(role) },
  { label: 'Настройки', link: '/settings', icon: 'setting', enabled: [roles.ADMIN].includes(role) },
])

const Page = ({ modalBag, children, title }) => {

  const profile = useSelector(profileSelector)

  return (
    <div className="wrapper">

      {/* Header */}
      <Header modalBag={modalBag}/>

      <div className="main-container">

        {/* Left menu desktop >=992px */}
        <div className="aside">
          <Menu className="main-menu_grey shadow" items={menuItems(profile.role)} />
        </div>

        {/* Mobile menu */}
        <Modal centered open={modalBag.isOpen} onClose={modalBag.close} className="menu-mobile-wrapper">
          <div><Menu className="main-menu_grey shadow" items={menuItems(profile.role)} /></div>
        </Modal>

        {/* Content */}
        <div className="container container--max-width">

          {/* Хлебные крошки */}
          <BreadCrumbs/>

          {/* title */}
          <div className="text_xxl text_bold mar-top_sm mar-btm_md">{title}</div>

          {children}

        </div>

      </div>
    </div>
  )
}

export default withModal('modalBag')(Page)