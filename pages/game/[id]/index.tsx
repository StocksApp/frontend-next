import { HStack, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SidebarLayout from '../../../components/layouts/SidebarLayout';
import { Card } from '../../../components/molecules';
import GenericTablePanel from '../../../components/molecules/GenericTablePanel';
import { links } from '../../../config/urls';
import { GiMagnifyingGlass } from 'react-icons/gi';
import GameInfoCard from '../../../components/organisms/GameInfoCard';
import {
  useGetUserGamesQuery,
  useMarketsNamesQuery,
} from '../../../generated/graphql';
import StrategyModal from '../../../components/organisms/StrategyModal';

const GameOverview = () => {
  const { query, push } = useRouter();
  const gameId = parseInt(query.id as string, 10);
  const { data } = useGetUserGamesQuery(); // TODO get only one game by id, get users in game in that query
  const game = data?.getUsersGames?.filter((g) => g.id === gameId)?.at(0); // bleh

  if (!gameId) push(links.game.browse);

  const { data: marketsNames } = useMarketsNamesQuery({
    variables: {
      stocks: game?.markets ? game?.markets?.map((m) => m.name) : undefined,
    },
  });

  const markets = marketsNames?.stocksSummary;

  if (!game || !markets) return null;

  return (
    <SidebarLayout>
      <HStack>
        <Card flex={1}>
          <GenericTablePanel
            title={'Zdefiniowane strategie'}
            actionNodes={<StrategyModal gameId={game.id} />}
            w="full"
          >
            <GenericTablePanel.Table
              tableHeaders={['Typ strategii', 'Więcej']}
              tableValues={[
                [
                  'TODO',
                  <GiMagnifyingGlass key={1} style={{ cursor: 'pointer' }} />,
                ],
              ]}
            />
          </GenericTablePanel>
        </Card>
        <GameInfoCard game={game} markets={markets} />
      </HStack>
      <HStack>
        <div>hadsfasd</div>
      </HStack>
    </SidebarLayout>
  );
};

GameOverview.auth = true;

export default GameOverview;
