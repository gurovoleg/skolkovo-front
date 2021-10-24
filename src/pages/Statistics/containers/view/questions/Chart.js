import React from 'react'
import { Wrap } from 'Components/ui'
import { BarChart } from 'Components/Chart'

const chartParams = {
  legends: (isMobile) => ([
    {
      anchor: isMobile ? 'bottom-left' : 'top',
      direction: isMobile ? 'column' : 'row',
      justify: false,
      translateX: 0,
      translateY: isMobile ? 100 : -50,
      itemsSpacing: 4,
      itemWidth: 150,
      itemHeight: isMobile ? 12 : 18,
      itemTextColor: '#999',
      itemDirection: 'left-to-right',
      itemOpacity: 1,
      symbolSize: isMobile ? 12 : 18,
      symbolShape: 'square',
    }
  ]),
}

const Chart = ({ data, match }) => {
  const questionId = match.params.questionId
  data = data[questionId].events // Выбираем вопрос
  // преобразуем объект в массив
  const chartData = Object.entries(data).map(([key, value]) => ({ event: key, ...value }))
  const keys = Object.keys(chartData[0]).filter(e => e !== 'event')

  return (
    <Wrap>
      <BarChart keys={keys} data={chartData} legends={chartParams.legends} />
    </Wrap>
  )
}

export default Chart
