import React from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const MicroChart = ({
  markings,
}: {
  markings: { date: string; close: number }[];
}) => {
  return (
    <ReactApexChart
      type="line"
      series={[
        {
          data: markings.map((m) => ({ x: m.date, y: m.close })),
          name: 'Kurs zamknięcia',
        },
      ]}
      options={{
        xaxis: {
          type: 'datetime' as const,
          labels: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        chart: {
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
      }}
      width={200}
      height={75}
    />
  );
};

export default MicroChart;
