import React from 'react'
import { Link } from "react-router-dom"
import { ListItem } from "./index"
import { Column as ListColumn } from 'Components'
import { Wrap, Empty } from "Components/ui"

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
    title: 'Текст',
    sortBy: 'text',
    classname: 'col-md-6'
  }
]

const List = ({ data, isOpened, idList, urlBag, selectItem }) => {
  return (
    <Wrap>

      {/* Нет данных */}
      {/*{data.length === 0 && <Empty/>}*/}

      {/* Кнопка добавить */}
      <div className="pad-btm_lg">
        <Link to="/questions/add" className="button button_sm text_md button_green">+ Добавить вопрос</Link>
      </div>

      {data.length === 0 && <div className="text_center disabled text_regular text_md pad-btm_sm">Нет данных</div>}
      {data.length > 0 &&
      <React.Fragment>

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
          {data.map(item =>
            <ListItem
              key={`${item.id}-${item.title}`}
              item={item}
              selectable={isOpened}
              selected={idList.includes(item.id)}
              onChange={selectItem}/>)}
        </div>

      </React.Fragment>}

    </Wrap>)
}

export default List