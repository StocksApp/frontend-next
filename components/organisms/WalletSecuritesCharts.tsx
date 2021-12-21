import React from 'react';
import { Heading, HStack } from '@chakra-ui/react';
import Card from '../molecules/Card';
import { isClient } from '../../utils/ssr';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type TMarketEntry = { ticker: string; market: string; quantity: number };

const WalletSecuritesCharts = ({
  marketName,
  securitiesInfo,
  markingsForTicker,
}: {
  marketName: string;
  securitiesInfo: TMarketEntry[];
  markingsForTicker: Map<string, number>;
}) => {
  const labels = [];
  const series = [];
  const valueSeries = [];

  securitiesInfo.forEach((s) => {
    labels.push(s.ticker);
    series.push(s.quantity);
    valueSeries.push(s.quantity * markingsForTicker.get(s.ticker));
  });

  return (
    isClient && (
      <Card h="full">
        <Heading size="md">Podział aktywów w obrębie {marketName}</Heading>
        <HStack>
          <ReactApexChart
            options={{ labels, title: { text: 'Ilość aktywu' } }}
            series={series}
            type="donut"
            width="250"
          />
          <ReactApexChart
            options={{ labels, title: { text: 'Szacowana wartość' } }}
            series={valueSeries}
            type="donut"
            width="250"
          />
        </HStack>
      </Card>
    )
  );
};

export default WalletSecuritesCharts;
