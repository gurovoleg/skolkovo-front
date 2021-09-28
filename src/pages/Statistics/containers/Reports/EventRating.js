import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ratingEventSelector } from 'Selectors/statistics'
import { Pagination, Icon } from 'semantic-ui-react'
import { Rating } from './index'
import { actions } from 'Reducers/statistics'

const EventRating = ({ event, workshop, match, history, loadPDF }) => {
  return (
    <Fragment>

      <div className="text_center text_lg text_bold pad-btm_md">Cобытие</div>

      <div className="row justify-content-center mar-btm_lg">
        <div className="col-auto">
          <Pagination
            activePage={match.params.eventId}
            firstItem={null}
            lastItem={null}
            prevItem={{ content: <Icon name='angle left'/>, icon: true }}
            nextItem={{ content: <Icon name='angle right'/>, icon: true }}
            pointing
            secondary
            totalPages={workshop.eventsTotal}
            onPageChange={(e, { activePage }) => {
              const url = match.url.slice(0, match.url.lastIndexOf('/'))
              history.push(`${url}/${activePage}`)
            }}
          />
        </div>
      </div>

      <div className="text_alignRight mar-btm_md">
        {/*<div className="button button_purple button_purple-shadow">*/}
        {/*  <Icon name="file pdf outline" fitted className="pad-right_sm" />*/}
        {/*  <span>Скачать PDF</span>*/}
        {/*</div>*/}
        <div className="button button_white button_shadow text_sm" onClick={() => loadPDF(event.workshopId, event.event)}>
          <Icon name="file pdf" color="red" />
          Скачать PDF
        </div>
      </div>

      {!event && <div className="text_center disabled text_regular text_md pad-btm_sm">Нет данных</div>}
      {event && event.result.length > 0 && <Rating data={event.result} /> }

    </Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  event: ratingEventSelector(state, props)
})

const mapDispatchToProps = dispatch => ({
  loadPDF: (workshopId, eventId) => dispatch(actions.loadPDF(workshopId, eventId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventRating))
