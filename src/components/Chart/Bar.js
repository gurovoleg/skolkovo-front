import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import withChart from './withChart'

const setInitialState = (props, isMobile) => {
  const result = {
    margin: props.margin || { top: 80, right: 50, bottom: 50, left: 60 },
    data: props.data || [],
    title: props.title || 'Диаграмма',
    colorScheme: props.colorScheme || 'nivo',
    height: props.height || 800,
    legends: props.legends || [],
    keys: props.keys || []
  }

  if (isMobile) {
    result.margin.bottom = 120
    result.margin.top = 20
  }

  return result
}

const Bar = (props) => {
  const { data, keys, colorScheme, legends, margin, isMobile } = props

  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy="event"
      margin={margin}
      padding={0}
      layout="horizontal"
      groupMode="stacked" // grouped
      valueScale={{ type: 'linear' }} // linear/symlog
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: colorScheme }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 4,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: ''
          },
          id: 'dots'
        },
        {
          match: {
            id: keys[keys.length - 1]
          },
          id: 'lines'
        }
      ]}
      // enableGridX={true}
      // enableGridY={true}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.5 ] ] }}
      // borderColor="#fff"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickOffset: 0,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 0
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Событие',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={5}
      labelSkipHeight={5}
      labelTextColor={{ from: 'color', modifiers: [['darker', 4.6]] }}
      legendLabel={datum => `${datum.id} (${datum.value}%)`}
      legends={legends(isMobile)}
      tooltip={ToolTip}
      // valueFormat={(v) => v + '%'}
    />
  )
}

const ToolTip = ({ id, value, color, data }) => (
  <div
    style={{
      padding: 6,
      color: '#000',
      background: '#fff',
      boxShadow: '1px 1px 10px 2px rgba(0, 0, 0, 0.1)'
    }}
  >
    <div style={{ marginBottom: '5px', textAlign: 'center' }}>Событие: <strong>{data.event}</strong></div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '15px', height: '15px', background: color, marginRight: '8px' }}></div>
      <div>{id}: <strong>{value}%</strong></div>
    </div>
  </div>
)

export default withChart(setInitialState)(Bar)
