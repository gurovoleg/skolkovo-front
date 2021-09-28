import React, { useState } from 'react'
import { ListItem } from "./index"
import { Column as ListColumn, AddForm } from 'Components'
import { Wrap } from "Components/ui"

const columns = [
  {
    title: 'ID',
    sortBy: 'id',
    classname: 'col-md-1'
  },
  {
    title: 'Название',
    sortBy: 'title',
    classname: 'col-md-3'
  },
  {
    title: 'Комментарий',
    sortBy: 'comment',
    classname: 'col-md-6'
  }
]

const List = ({ data, isOpened, idList, urlBag, selectItem, createQuiz }) => {
  const [addMode, setAddMode] = useState(false)

  return (
    <Wrap>

      {/* Кнопка Добавить */}
      {!addMode &&
      <div className="pad-btm_lg">
        <button className="button button_sm text_md button_green" onClick={() => setAddMode(true)}>+ Добавить опросник</button>
      </div>}

      {/* Форма добавления */}
      {addMode && <AddForm header="Создать" cancel={() => setAddMode(false)} submit={createQuiz}/>}

      {data.length === 0 && <div className="text_center disabled text_regular text_md pad-btm_sm">Нет данных</div>}

      {data.length > 0 &&
      <React.Fragment>

        {/* Колонки */}
        <div className="row wrap-inner_wide d-none d-md-flex pad-btm_sm">
          {columns.map(column => (
            <div key={column.title} className={column.classname}>
              <ListColumn title={column.title} sortBy={column.sortBy} urlBag={urlBag}/>
            </div>
          ))}
        </div>

        {/* Строки */}
        <div className="table-stripe">
          {data.map(item => (
            <ListItem
              key={`${item.id}-${item.title}`}
              item={item}
              selectable={isOpened}
              selected={idList.includes(item.id)}
              onChange={selectItem}/>)
          )}
        </div>
      </React.Fragment>}

    </Wrap>
  )
}

export default List