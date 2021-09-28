import React from 'react'
import classNames from "classnames"

const Column = ({ title, sortBy, urlBag }) => {
  const clickHandler = (searchString, sortBy) => urlBag.redirect(urlBag.sort(sortBy))

  const [sortName, dir] = urlBag.params.sort && urlBag.params.sort[0] && urlBag.params.sort[0].split('-') || []
  const isEnabled = (direction) => sortName === sortBy && dir === direction

  return (
    <div onClick={() => clickHandler(location.search, sortBy)}>
      <span className="text_sm text_bold">{title}</span>
      <div className={classNames(
        'mar-left_sm text_sm',
        {
          'sorting-item': sortBy, // Отображение контролов сортировки
          'sorting-item_up': isEnabled('asc'),
          'sorting-item_down': isEnabled('desc')
        })
      }>&nbsp;</div>
    </div>
  )
}

export default Column