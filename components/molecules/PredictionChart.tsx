import React, { useEffect, useMemo, useState } from 'react';
import { Card } from '.';
import { useForm } from 'react-hook-form';
import { Flex, Input, Button, Text, InputLeftAddon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { isClient } from '../../utils/ssr';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getSingleValueFromQuery } from '../../utils/url';
import { useGetMarkingsForTickerLazyQuery } from '../../generated/graphql';
import { addDays, format, subDays } from 'date-fns';
import { useCurrentGameContext } from '../../contexts/currentGameContext';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const chartOptions = (ticker?: string) => ({
  chart: {
    id: 'tickerChart',
    type: 'line' as const,
    height: 350,
  },
  title: {
    text: `Predykcje dla ${ticker ?? ''}`,
    align: 'left' as const,
  },
  xaxis: {
    type: 'datetime' as const,
  },
});

type TickerChartFormValues = {
  from: string;
  to: string;
  numberOfDays: number;
};

const PredictionChart = () => {
  const { game } = useCurrentGameContext();

  const { handleSubmit, register, setValue, getValues } =
    useForm<TickerChartFormValues>();
  const { query } = useRouter();
  const tickerVariables = {
    stock: getSingleValueFromQuery(query, 'market') ?? '',
    ticker: getSingleValueFromQuery(query, 'ticker') ?? '',
  };

  const [getMarkings, { data, loading }] = useGetMarkingsForTickerLazyQuery();

  const closeMarkings = useMemo(() => {
    const dates = [];
    const markings = [];
    const copy = [...(data?.getMarkings || [])];
    copy
      ?.sort((a, b) => new Date(a.date) - new Date(b.date))
      ?.forEach((m) => {
        dates.push(m.date);
        markings.push(m.marking.close);
      });
    return [dates, markings];
  }, [data]);

  const [predictions, setPredictions] = useState([]);

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
      setValue('numberOfDays', 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, getMarkings]);

  const getPredictions = async (histData) => {
    const res = await fetch('/api/arima', {
      body: JSON.stringify({
        inputData: histData,
        length: getValues('numberOfDays'),
      }),
      method: 'POST',
    });
    const { pred } = await res.json();
    // console.log(pred);
    setPredictions(pred);
  };

  useEffect(() => {
    if (closeMarkings[1].length !== 0) {
      // console.log(closeMarkings);
      getPredictions(closeMarkings[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeMarkings]);

  const onSubmit = (values: TickerChartFormValues) => {
    getMarkings({
      variables: {
        ...tickerVariables,
        startDate: values.from,
        endDate: values.to,
      },
    });
    getPredictions(closeMarkings[1]);
  };

  // console.log(closeMarkings);
  const labels = closeMarkings[0].concat(
    Array.from({ length: getValues('numberOfDays') }).map((_, idx) =>
      format(addDays(new Date(game.currentDate), idx), 'yyyy-MM-dd')
    )
  );
  // console.log(labels);
  const seriesHist = closeMarkings[1].concat(
    Array.from(predictions).map((_) => null)
  );

  const seriesPred = Array.from(closeMarkings[1])
    .map((e, idx) => {
      if (idx + 1 === closeMarkings[1].length) return e;
      else return null;
    })
    .concat(predictions);

  console.log(seriesPred);
  return (
    <Card h="full">
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
            type="number"
            {...register('numberOfDays')}
            maxW="150px"
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
          type="line"
          height={600}
          options={{
            ...chartOptions(getSingleValueFromQuery(query, 'ticker')),
            labels,
            annotations: {
              xaxis: [
                {
                  x: new Date(closeMarkings[0].at(-1)).getTime(),
                  strokeDashArray: 0,
                  borderColor: '#00e396',
                  label: {
                    borderColor: '#00e396',
                    style: {
                      color: '#fff',
                      background: '#00e396',
                    },
                    text: 'Ostatnie notowanie historyczne',
                  },
                },
              ],
            },
          }}
          series={[
            {
              data: seriesHist,
              name: 'Dane historyczne',
            },
            {
              data: seriesPred,
              name: 'Przewidywany kurs',
            },
          ]}
        />
      )}
    </Card>
  );
};

export default PredictionChart;
