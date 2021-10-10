import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { eventSelector } from 'Selectors/statistics'
import { Icon } from 'semantic-ui-react'
import { Rating } from './index'
import { actions } from 'Reducers/statistics'
import { Pagination } from "Components/ui"

const EventRating = ({ event, workshop, match, history, loadPDF }) => {

  console.log('66666666666666', workshop, match.params)

  return (
    <Fragment>

      <div className="text_alignRight mar-btm_md">
        <div className="button button_white button_shadow text_sm d-block d-sm-inline-block" onClick={() => loadPDF(event.workshopId, event.event)}>
          <Icon name="file pdf" color="red" />
          Скачать PDF
        </div>
      </div>

      <div className="text_center text_lg text_bold pad-btm_md">Cобытие</div>

      <div className="row justify-content-center mar-btm_lg">
        <div className="col-auto">
          <Pagination
            total={workshop.eventsTotal}
            current={match.params.eventId}
            onChange={(e, { activePage }) => {
                const url = match.url.slice(0, match.url.lastIndexOf('/'))
                history.push(`${url}/${activePage}`)
            }}
          />
        </div>
      </div>

      {!event && <div className="text_center disabled text_regular text_md pad-btm_sm">Нет данных</div>}
      {event && event.result.length > 0 && <Rating data={event.result} /> }

    </Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  event: eventSelector(state, props)
})

const mapDispatchToProps = dispatch => ({
  loadPDF: (workshopId, eventId) => dispatch(actions.loadPDF(workshopId, eventId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventRating))
