import React from 'react'

const PluralValue = ({ number, values }) => {
  let ending
  const n = number % 100
  if (n >= 11 && n <= 19) {
    ending = values[2]
  } else {
    const i = number % 10
    switch (i) {
      case (1): ending = values[0]; break
      case (2):
      case (3):
      case (4): ending = values[1]; break
      default: ending = values[2]
    }
  }

  const result = number ? number + ' ' + ending : ''

  return (
    <React.Fragment>{result}</React.Fragment>
  )
}

export default PluralValue
