import React, { Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { eventSelector } from 'Selectors/statistics'
import { Pagination } from "Components/ui"
import { Wrap } from 'Components/ui'


const Questions = ({ event, workshop, match }) => {

  console.log('111111111111', event, match, workshop)

  return (
    <Wrap>

      <div className="text_center text_lg text_bold pad-btm_lg pad-top_md ">Событие {event.event}. Данные опросника</div>

      {/*<div className="line mar-btm_lg"></div>*/}

      {!event && <div className="text_center disabled text_regular text_md pad-btm_sm">Нет данных</div>}
      {event && event.result.length > 0 &&
      <Fragment>
        {/* Колонки */}
        <div className="row wrap-inner_wide d-none d-md-flex pad-btm_sm">
          <div className="col-md-4 text_sm text_bold">Вопрос</div>
          <div className="col-md-8 text_sm text_bold">Текст</div>
        </div>

        {/* Строки */}
        <div className="table-stripe">
          {event.questions.map(item => (
            <div key={item.id} className="row table-stripe-item wrap-inner_wide pad-top_sm pad-btm_sm">
              <Link to={`${match.url}/question/${item.id}`} className="col-md-4">{item.title}</Link>
              <div className="col-md-8">{item.text}</div>
            </div>
          ))}
        </div>
      </Fragment>}

    </Wrap>
  )
}

const mapStateToProps = (state, props) => ({
  event: eventSelector(state, props)
})

export default withRouter(connect(mapStateToProps)(Questions))
