import { NextPage } from 'next';
import SidebarLayout from '../../components/layouts/SidebarLayout';
import { Card } from '../../components/molecules';
import {
  Table,
  Thead,
  TableCaption,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
} from '@chakra-ui/react';
import { useListJoinableGamesQuery } from '../../generated/graphql';
import { useCurrentGameContext } from '../../contexts/currentGameContext';
import { useRouter } from 'next/router';
import { links } from '../../config/urls';

const Game: NextPage = () => {
  const { data } = useListJoinableGamesQuery();
  const { changeGame } = useCurrentGameContext();
  const { push } = useRouter();
  return (
    <SidebarLayout>
      <Card h="full">
        <Table variant="simple">
          <TableCaption>Uproszczony widok aktywnych gier</TableCaption>
          <Thead>
            <Tr>
              <Th>Początek okresu gry</Th>
              <Th>Koniec okresu gry</Th>
              <Th>Wartość początkowa portfela</Th>
              <Th>Czas trwania tury</Th>
              <Th>Akcje</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.listJoinableGames &&
              data.listJoinableGames.map((game, index) => (
                <Tr key={index}>
                  <Td>{game.from}</Td>
                  <Td>{game.to}</Td>
                  <Td>{game.initialWalletValue}</Td>
                  <Td>{game.turnDuration}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        changeGame(game.id);
                        push(links.game.overview(`${game.id}`));
                      }}
                    >
                      Dołącz do gry
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Card>
    </SidebarLayout>
  );
};

export default Game;
