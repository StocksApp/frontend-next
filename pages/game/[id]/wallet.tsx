import { HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import SidebarLayout from '../../../components/layouts/SidebarLayout';
import Card from '../../../components/molecules/Card';
import GenericTablePanel from '../../../components/molecules/GenericTablePanel';
import {
  useGetUserGamesQuery,
  useGetWalletSummaryLazyQuery,
  useGetWalletSummaryQuery,
} from '../../../generated/graphql';

const WalletOverview = () => {
  const { query, push } = useRouter();
  const gameId = parseInt(query.id as string, 10);

  const { data: gameData } = useGetUserGamesQuery(); // TODO get only one game by id, get users in game in that query

  const game = gameData?.getUsersGames?.filter((g) => g.id === gameId)?.at(0); // bleh

  const [getWallet, { data: walletData }] = useGetWalletSummaryLazyQuery();

  useEffect(() => {
    if (gameId) {
      getWallet({ variables: { gameId } });
    }
  }, [gameId, getWallet]);

  console.log(walletData);
  return (
    <SidebarLayout>
      <HStack>
        <Card flex={1}>
          <GenericTablePanel title={'Posiadane aktywa'} w="full">
            <GenericTablePanel.Table
              tableHeaders={['Rynek', 'Ticker', 'Ilość']}
              tableValues={[]}
            />
          </GenericTablePanel>
        </Card>
        <Card flex={1}>
          <div>
            {/* {JSON.stringify(game)} */}
            {JSON.stringify(walletData)}
          </div>
        </Card>
      </HStack>
    </SidebarLayout>
  );
};

export default WalletOverview;
