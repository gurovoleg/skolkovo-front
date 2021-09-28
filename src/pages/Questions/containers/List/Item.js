import React from 'react'
import { Link } from "react-router-dom"
import { Icon } from "semantic-ui-react"
import { actions } from 'Reducers/question'
import { connect } from 'react-redux'

const Item = ({ item, selectable, selected, onChange, remove }) => {
  return (
    <div className="row table-stripe-item wrap-inner_wide pad-top_sm pad-btm_sm">

      {selectable && <input type="checkbox" className="checkbox-row" checked={selected} onChange={() => onChange(item.id)} />}

      <div className="col-md-1">
        <div>{item.id}</div>
      </div>
      <div className="col-md-3">
        <Link className="text_md text_medium text_purple" to={`/questions/${item.id}/edit`}>
          {item.title}
        </Link>
      </div>
      <div className="col-md-7">
        <div>{item.text}</div>
      </div>
      <div className="col-md-auto">
        <Icon title="Удалить" name="trash" color='blue' className="transform-scale" onClick={() => remove(item.id)}/>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  remove: (id) => dispatch(actions.questionDelete(id)),
})

export default connect(null, mapDispatchToProps)(Item)