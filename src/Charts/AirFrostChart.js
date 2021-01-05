import React from 'react';
import {DiscreteColorLegend, LineMarkSeries, XAxis} from 'react-vis';
import BaseChart from "./BaseChart";

function AirFrostChart({data}) {
  return (
    <BaseChart>
      <DiscreteColorLegend
        items={[
          {title: 'Air Frost', color: 'aqua'}
        ]}
      />
      <LineMarkSeries
        data={data.map(raw => ({x: raw.ts, y: parseFloat(raw.af)}))}
        color='aqua'
      />
      <XAxis tickFormat={d => {
        const date = new Date(d);
        return date.getFullYear() + '/' + (date.getMonth() + 1);
      }} />
    </BaseChart>
  );
}

export default AirFrostChart;
