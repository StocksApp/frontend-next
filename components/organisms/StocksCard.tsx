import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  Input,
  Button,
  Select,
  Box,
  Text,
  Flex,
  VStack,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Link,
} from '@chakra-ui/react';
import Card from '../molecules/Card';
import {
  useGetMarketsQuery,
  useGetTickersMarkingsLazyQuery,
} from '../../generated/graphql';
import { SearchIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { links } from '../../config/urls';
import { useCurrentGameContext } from '../../contexts/currentGameContext';
import { format, addDays } from 'date-fns';

// export type StocksCardProps = {};

type SearchbarFormValues = {
  market: string;
  ticker: string;
  date: string;
};

const StocksCard = () => {
  const { game } = useCurrentGameContext();

  const { register, handleSubmit, getValues, setValue } = useForm();
  const { data: marketsData } = useGetMarketsQuery();
  const [getTickers, { data: tickers, loading }] =
    useGetTickersMarkingsLazyQuery();

  const onSubmit = (formValues: SearchbarFormValues) => {
    getTickers({
      variables: {
        stock: formValues.market,
        tickers: formValues.ticker ? [formValues.ticker] : [],
        startDate: formValues.date,
        endDate: format(addDays(new Date(formValues.date), 1), 'yyyy-MM-dd'),
      },
    });
  };

  useEffect(() => {
    if (game) {
      setValue('date', game.currentDate);
    }
  }, [game, setValue]);

  const markets = useMemo(() => {
    return game
      ? marketsData?.stocksSummary.filter((m) =>
          game.markets.map((gm) => gm.name).includes(m.name)
        )
      : marketsData?.stocksSummary;
  }, [game, marketsData]);

  const tickersForCurrentMarket =
    tickers?.getManyMarkings &&
    tickers.getManyMarkings.length > 0 &&
    [...tickers.getManyMarkings].sort((a, b) =>
      a.marking.ticker.localeCompare(b.marking.ticker)
    );

  useEffect(() => {
    if (game && markets) {
      setValue('market', markets[0].name);
      getTickers({
        variables: {
          stock: markets[0].name,
          tickers: [],
          startDate: game.currentDate,
          endDate: format(addDays(new Date(game.currentDate), 1), 'yyyy-MM-dd'),
        },
      });
    }
  }, [markets, game, getTickers, setValue]);

  return (
    <Card>
      <Box w="auto">
        <VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex wrap="wrap" gridGap={2}>
              <Select {...register('market')} minW="250px" flex={1}>
                {markets?.map((summary, index) => (
                  <option key={index} value={summary.name}>
                    {summary.readableName}
                  </option>
                ))}
              </Select>
              <Input
                {...register('ticker')}
                placeholder="Podaj ticker"
                minW="200px"
                flex={1}
              />
              <Input
                type="date"
                max={game?.currentDate || format(Date.now(), 'yyyy-MM-dd')}
                {...register('date')}
                minW="150px"
                flex={1}
              />
              <Button type="submit" isLoading={loading} px={20} py={2} flex={1}>
                <Text mr={2}>Szukaj</Text>
                <SearchIcon />
              </Button>
            </Flex>
          </form>
          <Box>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Ticker</Th>
                  <Th>Wartość początkowa</Th>
                  <Th>Wartość najwyższa</Th>
                  <Th>Wartość najniższa</Th>
                  <Th>Wartość końcowa</Th>
                  <Th>Wolumen</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tickersForCurrentMarket &&
                  tickersForCurrentMarket.map(({ marking }, index) => (
                    <Tr key={index}>
                      <Td>
                        <NextLink
                          href={{
                            pathname: links.stocks.analysis,
                            query: {
                              ticker: marking.ticker,
                              market: getValues('market'),
                              ...(game?.id ? { id: game?.id } : {}),
                            },
                          }}
                        >
                          <Link color="teal.500">{marking.ticker}</Link>
                        </NextLink>
                      </Td>
                      <Td>{marking.open}</Td>
                      <Td>{marking.high}</Td>
                      <Td>{marking.low}</Td>
                      <Td>{marking.close}</Td>
                      <Td>{marking.volume}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Box>
    </Card>
  );
};

export default StocksCard;
