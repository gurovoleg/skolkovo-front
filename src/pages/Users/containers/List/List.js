import React from 'react'
import { Link } from "react-router-dom"
import { ListItem } from "./index"
import { Column as ListColumn } from 'Components'
import { Wrap } from "Components/ui"

const columns = [
  {
    title: 'ID',
    sortBy: 'id',
    classname: 'col-md-1'
  },
  {
    title: 'ФИО',
    sortBy: 'surname',
    classname: 'col-md-3'
  },
  {
    title: 'Email',
    sortBy: 'email',
    classname: 'col-md-3'
  },
  {
    title: 'Практикум',
    sortBy: 'workshop',
    classname: 'col-md-3'
  },
  {
    title: 'Группа',
    sortBy: 'unit',
    classname: 'col-md-2'
  },
]

const List = ({ users, isOpened, idList, urlBag, onItemChange }) => {

  return (
    <Wrap>

      {/* Кнопки добавить пользователя и получить Excel список пользователей */}
      <Link to="/users/add" className="button button_sm text_md button_green d-block d-sm-inline-block mar-btm_lg">+ Добавить</Link>

      {/* Колонки */}
      <div className="row wrap-inner_wide d-none d-md-flex pad-btm_sm">
        {columns.map(column => (
          <div key={column.sortBy} className={column.classname}>
            <ListColumn title={column.title} sortBy={column.sortBy} urlBag={urlBag}/>
          </div>
        ))}
      </div>

      {/* Строки */}
      <div className="table-stripe">
        {users.length === 0 && <div className="text_center text_bold text_lg pad-top_lg pad-btm_lg">Нет данных</div>}
        {users.length > 0 && users.map(item =>
          <ListItem
            key={`${item.id}-${item.title}`}
            user={item}
            selectable={isOpened}
            selected={idList.includes(item.id)}
            onChange={onItemChange}/>)}
      </div>
    </Wrap>
  )
}

export default List
