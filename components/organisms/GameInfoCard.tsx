import { Card } from '../molecules';
import { VStack, HStack, Heading, Text, Button } from '@chakra-ui/react';
import { GameRow, useStartGameMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';

type GameInfoCardType = {
  game: Omit<GameRow, 'ownerId' | 'private'>;
  markets: {
    name: string;
    readableName: string;
  }[];
};

//TODO add users count to displayed values
const GameInfoCard = ({ game, markets }: GameInfoCardType) => {
  const [startGame] = useStartGameMutation();
  const { push } = useRouter();

  const handleButtonClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await startGame({ variables: { gameId: game.id } });
    push(`/game/${game.id}/wallet`);
  };

  return (
    <Card>
      <VStack>
        <Heading>Parametry rozgrywki</Heading>
        <VStack>
          <HStack>
            <Text>Początek rozgrywki:</Text>
            <Text>{game.from}</Text>
          </HStack>
          <HStack>
            <Text>Koniec rozgrywki:</Text>
            <Text>{game.to}</Text>
          </HStack>
          <HStack>
            <Text>Początkowa wartość portfela:</Text>
            <Text>{game.initialWalletValue}</Text>
          </HStack>
          <HStack>
            <Text>Rynki w rozgrywce:</Text>
            <Text> {markets.map((m) => m.readableName).join(', ')}</Text>
          </HStack>
          {game.isStarted && !game.isFinished && (
            <HStack>
              <Text>Obecna data w rozgrywce</Text>
              <Text>{game.currentDate}</Text>
            </HStack>
          )}
          {!game.isStarted && (
            <Button onClick={handleButtonClick}>Rozpocznij grę</Button>
          )}
        </VStack>
      </VStack>
    </Card>
  );
};

export default GameInfoCard;
