import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import withChart from './withChart'

const setInitialState = (props, isMobile) => {
  const result = {
    margin: props.margin || { top: 50, right: 40, bottom: 40, left: 40 },
    data: props.data || [],
    title: props.title || 'Диаграмма',
    colorScheme: props.colorScheme || 'nivo', // nivo, paired
    height: props.height || 500,
    legends: props.legends || [],
  }

  if (isMobile) {
    result.margin.bottom = 80
    result.margin.top = 20
    result.height = 300
  }

  return result
}

const Pie = (props) => {
  const { data, colorScheme, legends, margin, isMobile } = props

  return (
    <ResponsivePie
      data={data}
      margin={margin}
      colors={{ scheme: colorScheme }}
      innerRadius={0.4} // радиус внутренней пустой окружности
      padAngle={1.7} // отступ между сегментами
      cornerRadius={4} // радиус углов
      activeOuterRadiusOffset={10} // радиус при увелечении сегмента
      borderWidth={1} // толщина линии границы
      borderColor={{ from: 'color', modifiers: [['darker', 0.9]] }}
      // свойства лейбла внутри сегмента
      enableArcLabels={true} // лейблы внутри сегментов
      arcLabelsSkipAngle={10} // угол сегмента при котором отображать лейбл (угол должен быть больше указанного значения)
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 10]] }} // цвет лейбла сегмента
      arcLabel={data => data.value + '%'} // формат данных id, value, callback
      // свойства лейбла снаружи сегмента
      enableArcLinkLabels={!isMobile} // лейблы снаружи сегментов
      arcLinkLabel="id" // формат данных id, value, callback
      arcLinkLabelsSkipAngle={10} // угол сегмента при котором отображать лейбл (угол должен быть больше указанного значения)
      arcLinkLabelsOffset={0} // отступ от сегмента
      arcLinkLabelsStraightLength={14} // длина прямого отрезка
      arcLinkLabelsTextColor="#333333" // цвет текста лейбла
      arcLinkLabelsThickness={2} // Толщина линии лейбла
      arcLinkLabelsColor={{ from: 'color' }} // цвет лейбла сегмента
      // параметры фигур для заливки (точки, квадраты: цвет, размеры...)
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      // заливка заданными фигурами указанных зон
      fill={[
        {
          match: { id: data[0].id },
          id: 'dots'
        }
      ]}
      legends={legends(isMobile)}
    />
  )
}

export default withChart(setInitialState)(Pie)
