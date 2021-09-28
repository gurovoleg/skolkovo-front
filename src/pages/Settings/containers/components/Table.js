import React, { useState, Fragment } from 'react'
import { Wrap } from 'Components/ui'
import { Column, Item } from './index'
import { AddForm } from 'Components'

const initialColumns = [
  {
    name: 'id',
    title: 'ID',
    size: 'col-md-1'
  },
  {
    name: 'title',
    title: 'Название',
    size: 'col-md-9'
  }
]

const Table = ({ items, create, columns = initialColumns }) => {
  const [addMode, setAddMode] = useState(false)

  return (
    <Wrap>

      {/* Кнопка Добавить */}
      {create && !addMode &&
      <div className="pad-btm_lg">
        <button className="button button_sm text_md button_green" onClick={() => setAddMode(true)}>+ Добавить</button>
      </div>}

      {/* Форма добавления */}
      {addMode && <AddForm header={`Создать`} cancel={() => setAddMode(false)} submit={create} />}

      {/* Нет данных */}
      {items.length === 0 && <div className="text_center disabled text_regular text_md pad-btm_sm">Нет данных</div>}

      {/* Таблица */}
      {items.length > 0 &&
      <Fragment>
        {/* Колонки */}
        <div className="row wrap-inner_wide d-none d-md-flex pad-btm_sm">
          {columns.map((column, idx) => <Column key={idx} column={column} />)}
        </div>

        {/* Строки */}
        <div className="table-stripe">
          {items.map(item => <Item key={item.id} item={item} columns={columns} />)}
        </div>
      </Fragment>}

    </Wrap>
  )
}

export default Table