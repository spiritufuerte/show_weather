import React from 'react';
import {XYPlot, YAxis, HorizontalGridLines, VerticalGridLines} from 'react-vis';

function BaseChart(props) {
  return (
    <XYPlot
      width={600}
      height={300}>
        <HorizontalGridLines />
        <VerticalGridLines />
      {props.children}
      <YAxis />
    </XYPlot>
  );
}

export default BaseChart;
