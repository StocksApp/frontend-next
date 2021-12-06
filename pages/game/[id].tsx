import { HStack, Button, Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SidebarLayout from '../../components/layouts/SidebarLayout';
import { Card } from '../../components/molecules';
import GenericTablePanel from '../../components/molecules/GenericTablePanel';
import { links } from '../../config/urls';
import { GiMagnifyingGlass } from 'react-icons/gi';
import GameInfoCard from '../../components/organisms/GameInfoCard';

const GameOverview = () => {
  const { query, push } = useRouter();
  const gameId = query.id;
  if (!gameId) push(links.game.browse);
  return (
    <SidebarLayout>
      <HStack>
        <Card flex={1}>
          <GenericTablePanel
            title={'Zdefiniowane strategie'}
            actionNodes={<Button>Dodaj strategię</Button>}
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
        <GameInfoCard />
      </HStack>
    </SidebarLayout>
  );
};

GameOverview.auth = true;

export default GameOverview;
