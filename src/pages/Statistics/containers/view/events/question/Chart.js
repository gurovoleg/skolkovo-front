import React from 'react'
import { PieChart } from 'Components/Chart'
import { Wrap } from 'Components/ui'

const chartParams = {
  legends: (isMobile) => ([
    {
      anchor: 'bottom-left',
      direction: 'column',
      justify: false,
      translateX: 0,
      translateY: isMobile ? 60 : 0,
      itemsSpacing: 4,
      itemWidth: 50,
      itemHeight: isMobile ? 12 : 18,
      itemTextColor: '#999',
      itemDirection: 'left-to-right',
      itemOpacity: 1,
      symbolSize: isMobile ? 12 : 18,
      symbolShape: 'circle',
    }
  ]),
}

const Chart = ({ data }) => {
  // преобразуем объект в массив [{ id, value, label }]
  data = Object.entries(data).map(([key, value]) => ({ id: key, value, label: key }))

  return (
    <Wrap>
      <PieChart data={data} legends={chartParams.legends} />
    </Wrap>
  )
}

export default Chart
