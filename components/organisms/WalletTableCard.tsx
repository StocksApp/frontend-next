import { Table, Thead, Tr, Th, Tbody, Td, Link } from '@chakra-ui/react';
import React from 'react';
import { links } from '../../config/urls';
import { Card } from '../molecules';
import NextLink from 'next/link';
import {
  GetMarketsQuery,
  GetWalletSummaryQuery,
} from '../../generated/graphql';
import MicroChart from '../molecules/MicroChart';
import { useCurrentGameContext } from '../../contexts/currentGameContext';

const WalletTableCard = ({
  walletData,
  marketsData,
}: {
  walletData: GetWalletSummaryQuery;
  marketsData: GetMarketsQuery;
}) => {
  const { game } = useCurrentGameContext();
  const lastMarkingsDate = walletData.getUserWallet.markings?.at(-1)?.date;

  const markings = walletData.getUserWallet.markings.filter(
    (m) => m.date === lastMarkingsDate
  );

  const lastMarkingForTicker = new Map<string, number>();
  markings.forEach((m) =>
    lastMarkingForTicker.set(m.marking.ticker, m.marking.open)
  );

  const markingsForTicker = new Map<
    string,
    { date: string; close: number }[]
  >();

  walletData.getUserWallet.markings.forEach((m) => {
    if (markingsForTicker.has(m.marking.ticker)) {
      const curr = markingsForTicker.get(m.marking.ticker);
      markingsForTicker.set(m.marking.ticker, [
        ...curr,
        { date: m.date, close: m.marking.close },
      ]);
    } else {
      markingsForTicker.set(m.marking.ticker, [
        { date: m.date, close: m.marking.close },
      ]);
    }
  });

  return (
    <Card flex={1}>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Rynek</Th>
            <Th>Ticker</Th>
            <Th>Ilość</Th>
            <Th>Obecny kurs</Th>
            <Th>Kurs zamknięcia</Th>
          </Tr>
        </Thead>
        <Tbody>
          {walletData.getUserWallet.ownedSecurities.map((s, index) => (
            <Tr key={index}>
              <Td>
                {
                  marketsData.stocksSummary.find((m) => m.name === s.market)
                    .readableName
                }
              </Td>
              <Td>
                <NextLink
                  href={{
                    pathname: links.stocks.analysis,
                    query: {
                      ticker: s.ticker,
                      market: s.market,
                      ...(game?.id ? { id: game?.id } : {}),
                    },
                  }}
                >
                  <Link color="teal.500">{s.ticker}</Link>
                </NextLink>
              </Td>
              <Td>{s.quantity}</Td>
              <Td>{lastMarkingForTicker.get(s.ticker)}</Td>
              <Td>
                <MicroChart markings={markingsForTicker.get(s.ticker)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Card>
  );
};

export default WalletTableCard;
