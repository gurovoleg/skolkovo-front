import React from 'react'
import { StreamChart } from 'Components/Chart'
import { groupRatingMovementSelector } from 'Selectors/statistics'
import { useSelector, connect } from "react-redux"
import { useParams, withRouter } from 'react-router-dom'
import { ResponsiveStream } from "@nivo/stream"

const chartParams = {
  legends: [
    {
      anchor: 'top', //bottom-right
      direction: 'row', //column
      // translateX: 110, // сдвиг блока по Х
      translateY: -50, // сдвиг блока по Y
      itemDirection: 'left-to-right',
      itemWidth: 70,
      itemHeight: 20,
      itemTextColor: '#999999',
      symbolSize: 16,
      symbolShape: 'circle',
    }
  ],
  margin: { top: 50, right: 60, bottom: 100, left: 60 }
}

const GroupMovement = ({ group }) => {

  console.log('121212121212', group)

  return (
      <StreamChart
        curve="basis"
        data={group.data}
        keys={group.keys}
        title="Диаграмма движения группы"
        legends={chartParams.legends}
        margin={chartParams.margin}
      />
  )
}

const mapStateToProps = (state, props) => ({
  group: groupRatingMovementSelector(state, props)
})

export default withRouter(connect(mapStateToProps)(GroupMovement))



