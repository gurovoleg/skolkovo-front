import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { positionMovementSelector } from 'Selectors/statistics'
import { Rating } from './index'
import classNames from "classnames"
import { Icon, Label } from 'semantic-ui-react'


const PositionMovement = ({ data, workshop }) => {
  const events = Array(Number(workshop.eventsTotal)).fill('').map((e, idx) => idx + 1)

  return (
    <Fragment>

      <div className="text_center text_lg text_bold pad-btm_lg">Динамика движения позиции в рейтинге </div>

      {Object.keys(data).length === 0 && <div className="text_center disabled text_regular text_md pad-btm_sm">Нет данных</div>}

      {/* Таблица */}
      {Object.keys(data).length > 0 &&
      <div className="d-flex table-stripe rounded overflow-hidden" style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}>

        {/* Колонка Пользователи */}
        <div className="no-wrap">

          {/* Заголовок */}
          <div className="table-stripe-item table-cell text_bold" style={{ borderBottom: '1px solid rgba(0, 0, 0, 1)' }}>
            Участник
          </div>

          {/* Пользователи */}
          {Object.keys(data).map(userId => {
            return <div key={userId} className="table-stripe-item table-cell pad-right_md pad-left_md">
              <div className="text_alignLeft ">{data[userId].user.name} {data[userId].user.surname}</div>
            </div>
          })}

        </div>

        {/* Колонка События */}
        <div className="no-wrap overflow-x" style={{ 'borderLeft': '1px solid rgba(0, 0, 0, 0.1)' }}>

          {/* Заголовок */}
          <div className="d-flex table-stripe-item text_bold" style={{ borderBottom: '1px solid rgba(0, 0, 0, 1)' }}>
            {events.map((eventNo, idx) => (
              <Fragment key={eventNo}>
                {idx !== 0 && <div className="table-cell"></div>}
                <div className="table-cell">{eventNo}</div>
              </Fragment>
            ))}
          </div>

          {/* События */}
          {Object.keys(data).map(userId => {
            let prevRating = null
            return (
              <div key={userId} className="d-flex table-stripe-item">
                {events.map((eventNo, idx) => {

                  let rating = data[userId].events[eventNo]
                  const diff = rating && prevRating ? (rating - prevRating).toFixed(1) : 0
                  const prefix = diff > 0 ? '+' : diff < 0 ? '-' : ''
                  prevRating = rating

                  return (
                    <Fragment key={eventNo}>

                      {idx !== 0 &&
                      <div title="Потеря/прирост позиции" style={{ position: 'relative' }} className={classNames('table-cell text_center text_sm text_medium', {
                        'table-cell_purple': diff > 0,
                        'table-cell_yellow': diff <= 0,
                        // 'table-cell_yellow': true,
                        'text_purple': diff > 0,
                        'text_red': diff < 0,
                        'text_grey': diff == 0,
                      })}>
                        {/*{diff > 0 && <Label corner="left" icon="long arrow alternate up" size="mini" color="blue" />}*/}
                        {/*{diff < 0 && <Label corner="left" icon="long arrow alternate down" size="mini" color="yellow" />}*/}
                        {prefix}{Math.abs(diff)}
                      </div>}

                      <div title="Позиция в рейтинге события" className="table-cell text_center">{rating || '-'}</div>

                    </Fragment>
                  )
                })}
              </div>
            )
          })}

        </div>
      </div>}

    </Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  data: positionMovementSelector(state, props)
})

export default withRouter(connect(mapStateToProps)(PositionMovement))
