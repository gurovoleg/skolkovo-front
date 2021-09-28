import React from 'react'
import { Wrap, DateValue } from 'Components/ui'
import { connect } from 'react-redux'
import { actions } from 'Reducers/statistics'
import { withRouter, Link } from 'react-router-dom'
import classNames from "classnames"

const Events = ({ workshop, calculateEvent, eventsData, match, canUpdate }) => {

  const events = Array(Number(workshop.eventsTotal)).fill('').map((e, idx) => idx + 1)

  return (
    <Wrap>

      <div className="wrap-inner history-wrap">
        {events.map((eventName, idx) => {
          const event = eventsData.find(e => eventName == e.event)

          return (
            <div key={idx} className={classNames(
              { 'wrap-inner_left-vertical-line wrap-inner_left-vertical-line_green': event },
              // { 'wrap-inner-block_grey': !event, 'wrap_green-gradient': event },
              'history-item wrap-inner-block wrap-inner-block_grey wrap-inner-block_round relative pad-btm_sm pad-right_md mar-btm_md'
            )}>
              <div className="history">
                <div className="history-dot"/>
                <div className="history-line"/>
              </div>
              <div className="row pad-left_xl">
                <div className="col-md-6">
                  <div className="text_md pad-btm_xs">Событие {eventName}</div>
                  <div className="text_sm pad-btm_sm">
                    {event && <span className="text_black">Аттестовано {event.attestedUsers} участников</span>}
                    {!event && <span className="text_grey">Итоги не подводились</span>}
                  </div>
                </div>
                <div className="col-md-6 text-md-right">
                  <div className="text_gre text_sm pad-btm_sm">
                    <DateValue value={event && event.created} format="DD-MM-YYYY" text=""/>
                  </div>

                  {event &&
                  <div>
                    <Link to={`/statistics/${workshop.id}/reports/events/${eventName}`} className="button button_green button_sm text_xs">Рейтинг</Link>
                    {canUpdate && <button className="button button_purple button_sm text_xs  mar-left_sm" onClick={() => calculateEvent(workshop.id, eventName)}>Пересчет</button>}
                  </div>}

                  {!event && canUpdate && <button className="button button_sm text_xs" onClick={() => calculateEvent(workshop.id, eventName)}>Подсчитать</button>}

                </div>
              </div>
            </div>
          )
        })}
      </div>

    </Wrap>
  )
}

const mapDispatchToProps = dispatch => ({
  calculateEvent: (workshopId, eventId) => dispatch(actions.create(workshopId, eventId))
})

export default withRouter(connect(null, mapDispatchToProps)(Events))
