import React from 'react'
import classNames from "classnames"

const Item = ({ item, columns }) => {
  return (
    <div className={classNames(
      'row table-stripe-item wrap-inner_wide pad-top_sm pad-btm_sm',
      { disabled: item.status === 'completed' }
    )}>
      {columns.map((column, idx) => {
        // Если для колонки задан метод render (то есть необходимо вывести данные в другом виде), то используем его
        // Например необходимо преобразовать дату в обычный формат или вывести другой компонент
        const value = column.render ? column.render(item) : item[column.name]

        return (
          <div key={idx} className={column.size}>{value}</div>
        )
      })}
    </div>
  )
}

export default Item