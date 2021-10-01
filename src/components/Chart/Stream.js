import React, { Fragment, useCallback, useRef } from 'react'
import { toPng } from 'html-to-image'
import { ResponsiveStream } from '@nivo/stream'
import { Icon } from "semantic-ui-react"

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

const mock = [
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


const Stream = ({ height = 500, title = 'Диаграмма', data = mock, keys, colorScheme = 'nivo' }) => {
  const ref = useRef(null)

  const buttonClickHandler = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'chart.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])


  return (
    <div>

      <div className="text_alignRight mar-btm_md">
        <div className="button button_white button_shadow text_sm" onClick={buttonClickHandler}>
          <Icon name="file image" color="blue" />
          Сохранить PNG
        </div>
      </div>

      <div ref={ref} style={{ height: `${height}px` }}>
        {title && <div className="text_bold text_lg text_center mar-btm_md">{title}</div>}

        <ResponsiveStream
          data={data}
          // keys={[ 'Raoul', 'Josiane', 'Marcel', 'René', 'Paul', 'Jacques' ]}
          keys={['1', '1 - 1.5', '1.6 - 1.9', '2', '2.1 - 2.4', '2.5 - 2.9', '3']}
          margin={{ top: 50, right: 110, bottom: 100, left: 60 }} // отступы
          // шкалы/оси
          axisTop={null}
          axisRight={null}
          axisBottom={{ orient: 'bottom', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: 36 }}
          axisLeft={{ orient: 'left', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: -40 }}
          // сетка
          enableGridX={true} // default true
          enableGridY={true} // default false
          curve="linear" // тип прямой (резкая, плавная...)
          offsetType="none"
          colors={{ scheme: colorScheme }}
          borderColor={{ theme: 'background' }}
          fillOpacity={0.85}
          // параметры фигур для заливки (точки, квадраты: цвет, размеры...)
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#2c998f',
              size: 4,
              padding: 2,
              stagger: true // расположить в шахматном порядке
            },
            {
              id: 'squares',
              type: 'patternSquares',
              background: 'inherit',
              color: '#e4c912',
              size: 6,
              padding: 2,
              stagger: true
            }
          ]}
          // заливка заданными фигурами указанных зон
          // fill={[
          //   {
          //     match: {
          //       id: 'Paul'
          //     },
          //     id: 'dots'
          //   },
          //   {
          //     match: {
          //       id: 'Marcel'
          //     },
          //     id: 'squares'
          //   }
          // ]}
          // точки на отрезках
          enableDots={false}
          dotSize={8}
          dotColor={{ from: 'color' }}
          dotBorderWidth={2}
          dotBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
          animate={true} // анинмация
          isInteractive={true} // включить возможность отобршажения подсказок
          enableStackTooltip={true} // отображение подсказки на графике
          // параметры легенды
          legends={[
            {
              anchor: 'bottom-right', //bottom-right
              direction: 'column', //column
              translateX: 110, // сдвиг блока по Х
              // translateY: -50, // сдвиг блока по Y
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: '#999999',
              symbolSize: 12,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000000'
                  }
                }
              ]
            }
          ]}
        />
      </div>

    </div>
  )
}

export default Stream
