import SidebarLayout from '../../components/layouts/SidebarLayout';
import { Card } from '../../components/molecules';
import { Table, Thead, Tr, Th, Td, Tbody, Button } from '@chakra-ui/react';
import { useGetJoinableGamesQuery } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { links } from '../../config/urls';

const Game = () => {
  const { data } = useGetJoinableGamesQuery();
  const { push } = useRouter();
  return (
    <SidebarLayout>
      <Card h="full">
        <Table variant="simple">
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
            {data?.getJoinableGames &&
              data.getJoinableGames.map((game, index) => (
                <Tr key={index}>
                  <Td>{game.from}</Td>
                  <Td>{game.to}</Td>
                  <Td>{game.initialWalletValue}</Td>
                  <Td>{game.turnDuration}</Td>
                  <Td>
                    <Button
                      onClick={() => {
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

Game.auth = true;

export default Game;
