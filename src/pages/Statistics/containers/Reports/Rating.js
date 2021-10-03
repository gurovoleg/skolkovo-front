import React, { Fragment } from 'react'

const defaultColumns = [
  {
    name: 'position',
    title: 'Место',
    size: 'col-md-1',
    render: item => item.rating.position
  },
  {
    name: 'userId',
    title: 'Имя',
    size: 'col-md-6',
    render: item => `${item.user.name} ${item.user.surname}`
  },
  {
    name: 'rating',
    title: 'Рейтинг',
    size: 'col-md-5',
    render: item => item.rating.value
  }
]

const Rating = ({ data, columns }) => {
  columns = columns || defaultColumns

  return (
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
          {data.map(item => {
            return (
              <div key={item.user.id} className="row table-stripe-item wrap-inner_wide pad-top_sm pad-btm_sm">
                {columns.map((column, idx) => {
                  const value = column.render ? column.render(item) : item[column.name]
                  return <div key={idx} className={column.size}>{value}</div>
                })}
              </div>
            )
          })}
        </div>

    </Fragment>
  )
}

export default Rating
