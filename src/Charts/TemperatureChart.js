import React from 'react';
import {DiscreteColorLegend, LineMarkSeries, XAxis} from 'react-vis';
import BaseChart from "./BaseChart";

function TemperatureChart({data}) {
  return (
    <BaseChart>
      <DiscreteColorLegend
        items={[
          {title: 'Max Temperature', color: 'rgb(255,26,26)'},
          {title: 'Min Temperature', color: 'rgb(26,64,255)'}
        ]}
      />
      <LineMarkSeries
        data={data.map(raw => ({x: raw.ts, y: parseFloat(raw.tmax)}))}
        color='rgb(255,26,26)'
      />
      <LineMarkSeries
        data={data.map(raw => ({x: raw.ts, y: parseFloat(raw.tmin)}))}
        color='rgb(26,64,255)'
      />
      <XAxis tickFormat={d => {
        const date = new Date(d);
        return date.getFullYear() + '/' + (date.getMonth() + 1);
      }} />
    </BaseChart>
  );
}

export default TemperatureChart;
