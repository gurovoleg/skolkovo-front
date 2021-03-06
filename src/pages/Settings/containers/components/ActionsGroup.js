import React from 'react'
import { Icon } from "semantic-ui-react"

const ActionsGroup = ({ item, update, remove, complete, loadExcel }) => {
  return (
    <React.Fragment>
      {update && <Icon title="Редактировать" name="edit" color='blue' className="transform-scale" onClick={() => update(item.id)}/>}
      {remove && <Icon title="Удалить" name="trash" color='blue' className="transform-scale" onClick={() => remove(item.id)}/>}
      {complete &&
      <Icon
        color='blue'
        title="Завершить"
        disabled={item.status === 'completed'}
        name="flag checkered"
        className="transform-scale"
        onClick={() => complete(item)}/>}
      {loadExcel && <Icon title="Список участников" name="file excel" color="green" className="transform-scale" onClick={() => loadExcel(item.id)}/>}
    </React.Fragment>
  )
}

export default ActionsGroup
