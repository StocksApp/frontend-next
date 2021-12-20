import { HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SidebarLayout from '../../../components/layouts/SidebarLayout';
import { Card } from '../../../components/molecules';
import GenericTablePanel from '../../../components/molecules/GenericTablePanel';
import { links } from '../../../config/urls';
import GameInfoCard from '../../../components/organisms/GameInfoCard';
import { useMarketsNamesQuery } from '../../../generated/graphql';
import StrategyModal from '../../../components/organisms/StrategyModal';
import { useCurrentGameContext } from '../../../contexts/currentGameContext';

const GameOverview = () => {
  const { query, push } = useRouter();
  const gameIdParam = parseInt(query.id as string, 10);
  const { game } = useCurrentGameContext();

  if (!gameIdParam) push(links.game.browse);

  const { data: marketsNames } = useMarketsNamesQuery({
    variables: {
      stocks: game?.markets ? game?.markets?.map((m) => m.name) : undefined,
    },
  });

  const markets = marketsNames?.stocksSummary;

  if (!game || !markets) return null;

  if (game && game.isStarted) {
    push(links.game.wallet.base(String(gameIdParam)));
  }

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
              tableValues={[]}
            />
          </GenericTablePanel>
        </Card>
        <GameInfoCard game={game} markets={markets} />
      </HStack>
    </SidebarLayout>
  );
};

GameOverview.auth = true;

export default GameOverview;
