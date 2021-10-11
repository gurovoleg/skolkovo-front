import React, { Fragment } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { eventSelector } from 'Selectors/statistics'
import { Wrap } from 'Components/ui'
import { Answers } from './question/index'

const columns = [
  {
    name: 'position',
    title: '№',
    size: 'col-md-1',
    render: (item, idx) => idx + 1
  },
  {
    name: 'userId',
    title: 'Имя',
    size: 'col-md-6',
    render: item => `${item.user.name} ${item.user.surname}`
  },
  {
    name: 'questions',
    title: 'Результат',
    size: 'col-md-5',
    render: (item, idx, match) => <Answers data={item.questions[match.params.questionId]}/>
  }
]

// function Answers ({ data }) {
//   if (data.rating) return data.rating.value
//
//   const result = formatToPercentage(data)
//   const orderedResult = sortObjectByKey(result)
//
//   return Object.entries(orderedResult).map(([key, value]) => {
//     return (
//       <Fragment>
//         <span className="text_light mar-right_xs">{key}:</span>
//         <span className="mar-right_sm">{value}%</span>
//       </Fragment>
//     )
//   })
// }

const Question = ({ event, match }) => {
  console.log('111111111111', event)

  return (
    <Wrap>

      <div className="text_center text_lg text_bold pad-btm_lg">{event.questions.find(q => q.id == match.params.questionId).text}</div>

      {/* Колонки */}
      <div className="row wrap-inner_wide d-none d-md-flex pad-btm_sm">
        {columns.map((column, idx) => (
          <div key={idx} className={column.size}>
            <span className="text_sm text_bold">{column.title}</span>
          </div>
        ))}
      </div>

      {/* Строки */}
      <div className="table-stripe">
        {event.result.map((item, idx) => {
          return (
            <div key={item.user.id} className="row table-stripe-item wrap-inner_wide pad-top_sm pad-btm_sm">
              {columns.map((column) => {
                const value = column.render ? column.render(item, idx, match) : item[column.name]
                return <div key={column.name} className={column.size}>{value}</div>
              })}
            </div>
          )
        })}
      </div>

    </Wrap>
  )
}

const mapStateToProps = (state, props) => ({
  event: eventSelector(state, props)
})

export default withRouter(connect(mapStateToProps)(Question))
