import React from 'react';

const chartOptions = {
  title: {
    text: 'Notowania',
    align: 'left' as const,
  },
  xaxis: {
    type: 'datetime' as const,
  },
};

const TickerChart = () => {
  console.log(chartOptions);
  return <div></div>;
};

export default TickerChart;
