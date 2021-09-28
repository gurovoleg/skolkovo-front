import React from 'react'
import { SelectControl } from 'Components'
import classNames from "classnames"

const Rating = ({ value, className, name }) => {
  const options = Array(Number(value)).fill(null).map((e, idx) => ({ label: idx + 1, value: idx + 1 }))

  return (
    <div className={classNames(className)}>
      <SelectControl name={name} options={options} label="Оценка"/>
    </div>
  )
}

export default Rating
