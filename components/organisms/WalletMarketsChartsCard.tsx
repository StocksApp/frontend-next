import { Heading, HStack } from '@chakra-ui/react';
import React from 'react';
import Card from '../molecules/Card';
import {
  GetMarketsQuery,
  GetWalletSummaryQuery,
} from '../../generated/graphql';
import { isClient } from '../../utils/ssr';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const WalletMarketsChartsCard = ({
  walletData,
  marketsData,
}: {
  walletData: GetWalletSummaryQuery;
  marketsData: GetMarketsQuery;
}) => {
  const numberByMarkets = new Map<string, number>();

  walletData.getUserWallet.ownedSecurities.forEach((s) => {
    if (numberByMarkets.has(s.market)) {
      const curr = numberByMarkets.get(s.market);
      numberByMarkets.set(s.market, curr + s.quantity);
    } else {
      numberByMarkets.set(s.market, s.quantity);
    }
  });

  const series = [];
  const labels = [];
  numberByMarkets.forEach((value, key) => {
    series.push(value);
    labels.push(
      marketsData.stocksSummary.find((m) => m.name === key).readableName
    );
  });

  const lastMarkingsDate = walletData.getUserWallet.markings?.at(-1)?.date;

  const markings = walletData.getUserWallet.markings.filter(
    (m) => m.date === lastMarkingsDate
  );

  const markingForTicker = new Map<string, number>();
  markings.forEach((m) =>
    markingForTicker.set(m.marking.ticker, m.marking.open)
  );

  const valueByMarket = new Map<string, number>();

  walletData.getUserWallet.ownedSecurities.forEach((s) => {
    if (valueByMarket.has(s.market)) {
      const curr = valueByMarket.get(s.market);
      const v = markingForTicker.get(s.ticker) * s.quantity;
      valueByMarket.set(s.market, curr + v);
    } else {
      const v = markingForTicker.get(s.ticker) * s.quantity;
      valueByMarket.set(s.market, v);
    }
  });

  const valueSeries = [];
  const valueLabels = [];
  valueByMarket.forEach((value, key) => {
    valueSeries.push(value);
    valueLabels.push(
      marketsData.stocksSummary.find((m) => m.name === key).readableName
    );
  });

  valueSeries.push(walletData.getUserWallet.availableMoney);
  valueLabels.push('Dostępne środki');

  return (
    isClient && (
      <Card mt={5}>
        <Heading>Podział aktywów pomiędzy rynki</Heading>
        <HStack>
          <ReactApexChart
            options={{ labels, title: { text: 'Ilość aktywu na rynku' } }}
            series={series}
            type="donut"
            width="380"
          />
          <ReactApexChart
            options={{
              labels: valueLabels,
              title: { text: 'Wartość na rynku' },
            }}
            series={valueSeries}
            type="donut"
            width="380"
          />
        </HStack>
      </Card>
    )
  );
};

export default WalletMarketsChartsCard;
