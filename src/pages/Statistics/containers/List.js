import React, { Fragment } from 'react'
import { connect, useSelector } from 'react-redux'
import { workshopsSelector } from 'Selectors/workshop'
import { Link } from "react-router-dom"
import { Wrap, DateValue } from 'Components/ui'
import { workshopStatuses as statuses } from "Root/settings"

const columns = [
  {
    name: 'id',
    title: '№',
    size: 'col-md-1',
    render: (item, idx) => idx + 1
  },
  {
    name: 'title',
    title: 'Название',
    size: 'col-md-4',
    render: (item) => <Link to={`/statistics/${item.id}`}>{item.title}</Link>
  },
  {
    name: 'status',
    title: 'Статус',
    size: 'col-md-3',
    render: item => item.status ? statuses[item.status].label : statuses.inactive.label
  },
  {
    name: 'usersTotal',
    title: 'Участники',
    size: 'col-md-2',
  },
  {
    name: 'updated',
    title: 'Обновлен',
    size: 'col-md-2',
    render: item => <DateValue value={item.updated}/> // вывод даты в привиденном формате
  }
]

const List = (props) => {

  const workshops = useSelector(workshopsSelector)

  return (
    <Wrap>

      {/* Нет данных */}
      {workshops.length === 0 && <div className="text_center disabled text_regular text_md pad-btm_sm">Нет данных</div>}

      {/* Таблица */}
      {workshops.length > 0 &&
      <Fragment>
        {/* Колонки */}
        <div className="row wrap-inner_wide d-none d-md-flex pad-btm_sm">
          {columns.map((column, idx) => (
            <div key={idx} className={column.size}>
              <span className="text_sm text_bold">{column.title}</span>
            </div>
          ))}
        </div>

        {/* Строки */}
        <div className="table-stripe">
          {workshops.map((item, index) => (
            <div key={item.id} className="row table-stripe-item wrap-inner_wide pad-top_sm pad-btm_sm">
              {columns.map((column, idx) => {
                const value = column.render ? column.render(item, index) : item[column.name]
                return <div key={idx} className={column.size}>{value}</div>
              })}
            </div>
          ))}
        </div>
      </Fragment>
      }

    </Wrap>
  )
}

export default List

