import React from 'react';
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
  TableCaption,
  Tr,
  Th,
  Td,
  Tbody,
  Link,
} from '@chakra-ui/react';
import Card from '../molecules/Card';
import {
  useGetMarketsQuery,
  useGetTickersLazyQuery,
} from '../../generated/graphql';
import { SearchIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { technicalAnalysisUrl } from '../../config/urls';

// export type StocksCardProps = {};

type SearchbarFormValues = {
  market: string;
  ticker: string;
};

const StocksCard = () => {
  const { register, handleSubmit } = useForm();
  const { data: markets } = useGetMarketsQuery();
  const [getTickers, { data: tickers }] = useGetTickersLazyQuery();

  const onSubmit = (formValues: SearchbarFormValues) => {
    getTickers({
      variables: {
        stocks: [formValues.market],
      },
    });
  };

  const tickersForCurrentMarket =
    tickers?.stocksSummary &&
    tickers.stocksSummary.length > 0 &&
    tickers.stocksSummary[0].securities;

  return (
    <Card>
      <Box w="auto">
        <VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex wrap="wrap" gridGap={2}>
              <Select
                placeholder="Wybierz rynek"
                {...register('market')}
                minW="150px"
                flex={1}
              >
                {markets?.stocksSummary.map((summary, index) => (
                  <option key={index} value={summary.name}>
                    {summary.readableName}
                  </option>
                ))}
              </Select>
              <Input
                {...register('ticker')}
                placeholder="Podaj tickera"
                minW="200px"
                flex={1}
              />
              <Input type="date" {...register('from')} minW="150px" flex={1} />
              <Input type="date" {...register('to')} minW="150px" flex={1} />
              <Button type="submit" isLoading={false} px={20} py={2} flex={1}>
                <Text mr={2}>Szukaj</Text>
                <SearchIcon />
              </Button>
            </Flex>
          </form>
          <Box>
            <Table variant="striped">
              <TableCaption>Uproszczony widok notowań</TableCaption>
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
                  tickersForCurrentMarket.map((ticker, index) => (
                    <Tr key={index}>
                      <Td>
                        <NextLink
                          href={{
                            pathname: technicalAnalysisUrl,
                            query: {
                              ticker: ticker.ticker,
                            },
                          }}
                        >
                          <Link color="teal.500">{ticker.ticker}</Link>
                        </NextLink>
                      </Td>
                      <Td>{2}</Td>
                      <Td>{4}</Td>
                      <Td>{1}</Td>
                      <Td>{3}</Td>
                      <Td>{1}</Td>
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
