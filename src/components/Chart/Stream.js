import React, { useCallback, useRef } from 'react'
import { toPng } from 'html-to-image'
import { ResponsiveStream } from '@nivo/stream'
import { Icon } from "semantic-ui-react"

const mock = [
  {
    1: 10, // 10%
    '1-1.5': 15, // 15%
    '1.6-1.9': 15, // 15%
    2: 20, // 20%
    '2.1-2.4': 25, // 25%
    '2.5-2.9': 10, // 10%
    3: 5 // 5%
  },
  {
    1: 5,
    '1-1.5': 20,
    '1.6-1.9': 10,
    2: 35,
    '2.1-2.4': 20,
    '2.5-2.9': 5,
    3: 5
  },
  {
    1: 0,
    '1-1.5': 5,
    '1.6-1.9': 40,
    2: 0,
    '2.1-2.4': 5,
    '2.5-2.9': 50,
    3: 0
  },
  {
    1: 10,
    '1-1.5': 15,
    '1.6-1.9': 20,
    2: 20,
    '2.1-2.4': 15,
    '2.5-2.9': 15,
    3: 5
  },
]

const setInitialState = props => ({
  margin: props.margin || { top: 50, right: 50, bottom: 100, left: 70 },
  data: props.data || [],
  title: props.title || 'Диаграмма',
  curve: props.curve || 'linear',
  colorScheme: props.colorScheme || 'nivo', //red_yellow_blue
  height: props.height || 400,
  legends: props.legends || [],
  keys: props.keys || []
})

const Stream = (props) => {
  const { height, title, data, keys, colorScheme, curve, legends, margin } = setInitialState(props)

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

      {/*<div className="text_alignRight mar-btm_md">*/}
      {/*  <div className="button button_white button_shadow text_sm d-block d-sm-inline-block" onClick={buttonClickHandler}>*/}
      {/*    <Icon name="file image" color="blue" />*/}
      {/*    Сохранить PNG*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div ref={ref} style={{ height: `${height}px` }}>
        {/*{title && <div className="text_bold text_lg text_center mar-btm_md">{title}</div>}*/}

        <ResponsiveStream
          order="reverse"
          data={data}
          keys={keys}
          margin={margin} // отступы
          // шкалы/оси
          axisTop={null}
          axisRight={null}
          axisBottom={{ orient: 'bottom', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'События', legendOffset: 45, legendPosition: 'middle' }}
          axisLeft={{ orient: 'left', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'Участники, %', legendOffset: -45, legendPosition: 'middle' }}
          enableGridX={true} // default true
          enableGridY={true} // default false
          curve={curve} // тип прямой (резкая, плавная...)
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
              color: '#F07F8A',
              size: 4,
              padding: 2,
              stagger: true // расположить в шахматном порядке
            },
            {
              id: 'squares',
              type: 'patternSquares',
              background: 'inherit',
              color: '#F07F8A',
              size: 6,
              padding: 2,
              stagger: true
            },
            {
              id: 'squares2',
              type: 'patternSquares',
              background: 'inherit',
              color: '#FFB35C',
              size: 6,
              padding: 2,
              stagger: true
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#EC5B69',
              lineWidth: 2,
              spacing: 5,
              rotation: 0
            }
          ]}
          // заливка заданными фигурами указанных зон
          fill={[
            {
              match: {
                id: '1'
              },
              id: 'dots'
            },
            {
              match: {
                id: '2'
              },
              id: 'squares2'
            },
            {
              match: {
                id: '3'
              },
              id: 'squares'
            }
          ]}
          // точки на отрезках
          enableDots={false}
          dotSize={8}
          dotColor={{ from: 'color' }}
          dotBorderWidth={2}
          dotBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
          animate={true} // анинмация
          isInteractive={true} // включить возможность отобршажения подсказок
          enableStackTooltip={true} // отображение подсказки на графике
          // параметры легенды (массив с объектами)
          // legends={legends}
        />
      </div>

    </div>
  )
}

export default Stream
