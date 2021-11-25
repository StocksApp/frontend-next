import React from 'react';
import { Card } from '.';
import { useForm } from 'react-hook-form';
import { Flex, Input, Button, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { isClient } from '../../utils/ssr';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getSingleValueFromQuery } from '../../utils/url';
import { useGetMarkingsForTickerQuery } from '../../generated/graphql';
import { format, subDays } from 'date-fns';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const chartOptions = (ticker?: string) => ({
  chart: {
    id: 'tickerChart',
    type: 'candlestick' as const,
    height: 350,
  },
  title: {
    text: `Notowania dla ${ticker ?? ''}`,
    align: 'left' as const,
  },
  xaxis: {
    type: 'datetime' as const,
  },
});

type TickerChartFormValues = {
  from: string;
  to: string;
};

const TickerChart = () => {
  const { handleSubmit, register } = useForm<TickerChartFormValues>();
  const { query } = useRouter();
  const tickerVariables = {
    stock: getSingleValueFromQuery(query, 'market') ?? '',
    ticker: getSingleValueFromQuery(query, 'ticker') ?? '',
  };
  const { data, refetch, loading } = useGetMarkingsForTickerQuery({
    variables: {
      ...tickerVariables,
      startDate: format(subDays(Date.now(), 14), 'yyyy-MM-dd'),
      endDate: format(Date.now(), 'yyyy-MM-dd'),
    },
  });

  const onSubmit = (values: TickerChartFormValues) => {
    refetch({
      ...tickerVariables,
      startDate: values.from,
      endDate: values.to,
    });
  };

  return (
    <Card h="full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex wrap="wrap" gridGap={2}>
          <Input type="date" {...register('from')} minW="150px" flex={1} />
          <Input type="date" {...register('to')} minW="150px" flex={1} />
          <Button type="submit" isLoading={loading} px={20} py={2} flex={1}>
            <Text mr={2}>Szukaj</Text>
            <SearchIcon />
          </Button>
        </Flex>
      </form>
      {isClient && getSingleValueFromQuery(query, 'ticker') && (
        <ReactApexChart
          type="candlestick"
          height={600}
          options={chartOptions(getSingleValueFromQuery(query, 'ticker'))}
          series={[
            {
              data: data?.getMarkings.map((ticker) => ({
                x: ticker.date,
                y: [
                  ticker.marking.open,
                  ticker.marking.high,
                  ticker.marking.low,
                  ticker.marking.close,
                ],
              })),
            },
          ]}
        />
      )}
    </Card>
  );
};

export default TickerChart;
