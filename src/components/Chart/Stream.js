import React from 'react'
import { ResponsiveStream } from '@nivo/stream'
import withChart from './withChart'

const setInitialState = (props, isMobile) => {
  const result = {
    margin: props.margin || { top: 50, right: 50, bottom: 100, left: 70 },
    data: props.data || [],
    title: props.title || 'Диаграмма',
    curve: props.curve || 'linear',
    colorScheme: props.colorScheme || 'nivo', //red_yellow_blue
    height: props.height || 500,
    legends: props.legends || [],
    keys: props.keys || []
  }

  if (isMobile) {
    result.margin = { top: 40, right: 30, bottom: 70, left: 30 }
    result.height = 300
  }

  return result
}

const Stream = (props) => {
  const { data, keys, curve, colorScheme, legends, margin, isMobile } = props

  return (
    <ResponsiveStream
      order="reverse"
      data={data}
      keys={keys}
      margin={margin} // отступы
      // шкалы/оси
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: v => isMobile ? '' : v,
        tickSize: isMobile ? 0 : 5,
        orient: 'bottom',
        legend: 'События',
        legendOffset: isMobile ? 20 : 45,
        legendPosition: 'middle'
      }}
      // axisBottom={{ format: v => '',orient: 'bottom', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'События', legendOffset: 45, legendPosition: 'middle' }}
      axisLeft={{
        format: v => isMobile ? '' : v,
        tickSize: isMobile ? 0 : 5,
        orient: 'left',
        legend: 'Участники, %',
        legendOffset: isMobile ? -20 : -45,
        legendPosition: 'middle'
      }}
      // axisBottom={null}
      // axisLeft={null}
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
      isInteractive={true} // включить возможность отображения подсказок
      enableStackTooltip={true} // отображение подсказки на графике
      // параметры легенды (массив с объектами)
      legends={isMobile ? [] : legends}
      tooltipFormat={value => value + '%'}
    />
  )
}

export default withChart(setInitialState, 768)(Stream)
