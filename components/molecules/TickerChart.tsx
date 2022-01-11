import React, { useEffect } from 'react';
import { Card } from '.';
import { useForm } from 'react-hook-form';
import { Flex, Input, Button, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { isClient } from '../../utils/ssr';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getSingleValueFromQuery } from '../../utils/url';
import { useGetMarkingsForTickerLazyQuery } from '../../generated/graphql';
import { format, subDays } from 'date-fns';
import { useCurrentGameContext } from '../../contexts/currentGameContext';
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
  const { game } = useCurrentGameContext();

  const { handleSubmit, register, setValue } = useForm<TickerChartFormValues>();
  const { query } = useRouter();
  const tickerVariables = {
    stock: getSingleValueFromQuery(query, 'market') ?? '',
    ticker: getSingleValueFromQuery(query, 'ticker') ?? '',
  };

  const [getMarkings, { data, loading }] = useGetMarkingsForTickerLazyQuery();

  useEffect(() => {
    if (game) {
      const startDate = format(
        subDays(new Date(game.currentDate), 30),
        'yyyy-MM-dd'
      );

      getMarkings({
        variables: {
          ...tickerVariables,
          startDate,
          endDate: game.currentDate,
        },
      });

      setValue('from', startDate);
      setValue('to', game.currentDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, getMarkings]);

  const onSubmit = (values: TickerChartFormValues) => {
    getMarkings({
      variables: {
        ...tickerVariables,
        startDate: values.from,
        endDate: values.to,
      },
    });
  };

  return (
    <Card h="80%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex wrap="wrap" gridGap={2}>
          <Input
            type="date"
            max={game?.currentDate}
            {...register('from')}
            minW="150px"
            flex={1}
          />
          <Input
            type="date"
            max={game?.currentDate}
            {...register('to')}
            minW="150px"
            flex={1}
          />
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
