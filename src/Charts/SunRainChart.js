import React from 'react';
import {DiscreteColorLegend, LineMarkSeries, XAxis} from 'react-vis';
import BaseChart from "./BaseChart";

function SunRainChart({data}) {
  return (
    <BaseChart>
      <DiscreteColorLegend
        items={[
          {title: 'Sunshine days', color: 'yellow'},
          {title: 'Rainfall days', color: 'blue'}
        ]}
      />
      <LineMarkSeries
        data={data.map(raw => ({x: raw.ts, y: parseFloat(raw.sun)}))}
        color='yellow'
      />
      <LineMarkSeries
        data={data.map(raw => ({x: raw.ts, y: parseFloat(raw.rain)}))}
        color='blue'
      />
      <XAxis tickFormat={d => {
        const date = new Date(d);
        return date.getFullYear() + '/' + (date.getMonth() + 1);
      }} />
    </BaseChart>
  );
}

export default SunRainChart;
