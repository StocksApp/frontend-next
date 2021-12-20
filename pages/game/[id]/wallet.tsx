import { Container, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import SidebarLayout from '../../../components/layouts/SidebarLayout';
import WalletInfoCard from '../../../components/organisms/WalletInfoCard';
import {
  useGetMarketsLazyQuery,
  useGetUserGamesQuery,
  useGetWalletSummaryLazyQuery,
} from '../../../generated/graphql';
import WalletTableCard from '../../../components/organisms/WalletTableCard';
import WalletMarketsChartsCard from '../../../components/organisms/WalletMarketsChartsCard';
import WalletSecuritesCharts from '../../../components/organisms/WalletSecuritesCharts';

type TMarketEntry = { ticker: string; market: string; quantity: number };

const WalletOverview = () => {
  const { query } = useRouter();
  const gameId = parseInt(query.id as string, 10);

  const { data: gameData } = useGetUserGamesQuery(); // TODO get only one game by id, get users in game in that query

  const game = gameData?.getUsersGames?.filter((g) => g.id === gameId)?.at(0); // bleh

  const [getWallet, { data: walletData }] = useGetWalletSummaryLazyQuery();

  const [getMarkets, { data: marketsData }] = useGetMarketsLazyQuery();

  useEffect(() => {
    if (gameId) {
      getWallet({ variables: { gameId } });
    }
  }, [gameId, getWallet]);

  useEffect(() => {
    if (game) {
      getMarkets({
        variables: {
          stocks: game.markets.map((m) => m.name),
        },
      });
    }
  }, [game, getMarkets]);

  if (!game || !walletData || !marketsData) {
    return null;
  }

  const byMarkets = new Map<string, Array<TMarketEntry>>();

  walletData.getUserWallet.ownedSecurities.forEach((s) => {
    if (byMarkets.has(s.market)) {
      const curr = byMarkets.get(s.market);
      byMarkets.set(s.market, [...curr, s]);
    } else {
      byMarkets.set(s.market, [s]);
    }
  });

  const lastMarkingsDate = walletData.getUserWallet.markings?.at(-1)?.date;

  const markings = walletData.getUserWallet.markings.filter(
    (m) => m.date === lastMarkingsDate
  );

  const markingForTicker = new Map<string, number>();
  markings.forEach((m) =>
    markingForTicker.set(m.marking.ticker, m.marking.open)
  );

  return (
    <SidebarLayout>
      <VStack>
        <HStack>
          <WalletInfoCard game={game} walletInfo={walletData.getUserWallet} />
          <WalletMarketsChartsCard
            walletData={walletData}
            marketsData={marketsData}
          />
        </HStack>
        <WalletTableCard walletData={walletData} marketsData={marketsData} />

        {Array.from(byMarkets).map(([marketName, marketInfo]) => (
          <WalletSecuritesCharts
            key={marketName}
            marketName={
              marketsData.stocksSummary.find((m) => m.name === marketName)
                .readableName
            }
            securitiesInfo={marketInfo}
            markingsForTicker={markingForTicker}
          />
        ))}
      </VStack>
    </SidebarLayout>
  );
};

WalletOverview.auth = true;

export default WalletOverview;
