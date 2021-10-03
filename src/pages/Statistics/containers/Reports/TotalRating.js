import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ratingTotalSelector } from 'Selectors/statistics'
import { Rating } from './index'

const columns = [
  {
    name: 'position',
    title: '№',
    size: 'col-md-1'
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
  }
]

const TotalRating = ({ total }) => {
  return (
    <Fragment>

      {(!total || total.length === 0) && <div className="text_center disabled text_regular text_md pad-btm_sm">Нет данных</div>}
      {total && total.length > 0 && <Rating data={total} columns={columns} /> }

    </Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  total: ratingTotalSelector(state, props)
})

export default withRouter(connect(mapStateToProps)(TotalRating))
