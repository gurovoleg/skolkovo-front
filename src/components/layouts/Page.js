import React from 'react'
import './layouts.css'
import { Header, BreadCrumbs } from 'Components'
import { Menu } from 'Components/ui'
import { withModal } from 'Components/Modal'
import { Modal } from 'semantic-ui-react'

const menuItems = [
  {
    label: 'Пользователи',
    link: '/users',
    icon: 'users',
    subItems: [
      { label: 'Все', link: '/users' },
      { label: 'Активные', link: '/users?status=active' }
    ]
  },
  { label: 'Вопросы', link: '/questions', icon: 'tasks' },
  { label: 'Опросники', link: '/quizzes', icon: 'clipboard' },
  // { label: 'Отчеты', link: '/5', icon: 'trophy' },
  { label: 'Аттестация', link: '/appraisal', icon: 'balance scale' },
  { label: 'Статистика', link: '/statistics', icon: 'chart line' },
  { label: 'Настройки', link: '/settings', icon: 'setting' },
]

const Page = ({ modalBag, children, title }) => {
  return (
    <div className="wrapper">

      {/* Header */}
      <Header modalBag={modalBag}/>

      <div className="main-container">

        {/* Left menu desktop >=992px */}
        <div className="aside">
          <Menu className="main-menu_grey shadow" items={menuItems} />
        </div>

        {/* Mobile menu */}
        <Modal centered open={modalBag.isOpen} onClose={modalBag.close} className="menu-mobile-wrapper">
          <div><Menu className="main-menu_grey shadow" items={menuItems} /></div>
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