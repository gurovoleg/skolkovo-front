import React from 'react'
import { StreamChart } from 'Components/Chart'

// const data= [
//   {
//     "Raoul": 147,
//     "Josiane": 80,
//     "Marcel": 76,
//     "René": 119,
//     "Paul": 49,
//     "Jacques": 174
//   },
//   {
//     "Raoul": 26,
//     "Josiane": 72,
//     "Marcel": 140,
//     "René": 178,
//     "Paul": 168,
//     "Jacques": 20
//   },
//   {
//     "Raoul": 153,
//     "Josiane": 12,
//     "Marcel": 118,
//     "René": 88,
//     "Paul": 174,
//     "Jacques": 29
//   },
//   {
//     "Raoul": 134,
//     "Josiane": 86,
//     "Marcel": 116,
//     "René": 64,
//     "Paul": 95,
//     "Jacques": 103
//   },
//   {
//     "Raoul": 10,
//     "Josiane": 32,
//     "Marcel": 118,
//     "René": 169,
//     "Paul": 118,
//     "Jacques": 145
//   },
//   {
//     "Raoul": 102,
//     "Josiane": 166,
//     "Marcel": 81,
//     "René": 75,
//     "Paul": 191,
//     "Jacques": 36
//   },
//   {
//     "Raoul": 80,
//     "Josiane": 41,
//     "Marcel": 97,
//     "René": 191,
//     "Paul": 180,
//     "Jacques": 155
//   },
//   {
//     "Raoul": 184,
//     "Josiane": 111,
//     "Marcel": 95,
//     "René": 179,
//     "Paul": 33,
//     "Jacques": 61
//   },
//   {
//     "Raoul": 120,
//     "Josiane": 153,
//     "Marcel": 145,
//     "René": 154,
//     "Paul": 14,
//     "Jacques": 135
//   }
// ]

const data = [
  {
    1: 10, // 10%
    '1 - 1.5': 5, // 15%
    '1.6 - 1.9': 0, // 15%
    2: 5, // 20%
    '2.1 - 2.4': 5, // 25%
    '2.5 - 2.9': -15, // 10%
    3: -5 // 5%
  },
  {
    1: 5,
    '1 - 1.5': 20,
    '1.6 - 1.9': 10,
    2: 35,
    '2.1 - 2.4': 20,
    '2.5 - 2.9': 5,
    3: 5
  },
]


const GroupMovement = (props) => {
  return (
      <StreamChart />
  )
}

export default GroupMovement



