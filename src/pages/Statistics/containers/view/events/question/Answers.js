import React, { Fragment } from 'react'

const Answers = ({ data }) => {
  if (data.rating) return data.rating.value

  return Object.entries(data).map(([key, value]) => {
    return (
      <Fragment key={key + value}>
        <span className="text_light mar-right_xs">{key}:</span>
        <span className="mar-right_sm">{value}%</span>
      </Fragment>
    )
  })
}

export default Answers
