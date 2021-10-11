import React, { Fragment } from 'react'
import { formatToPercentage, sortObjectByKey } from 'Utils'

const Answers = ({ data }) => {
  if (data.rating) return data.rating.value

  const result = formatToPercentage(data)
  const orderedResult = sortObjectByKey(result)

  return Object.entries(orderedResult).map(([key, value]) => {
    return (
      <Fragment key={key + value}>
        <span className="text_light mar-right_xs">{key}:</span>
        <span className="mar-right_sm">{value}%</span>
      </Fragment>
    )
  })
}

export default Answers
