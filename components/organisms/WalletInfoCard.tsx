import { Heading, HStack, VStack, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { GameRow, WalletSummary } from '../../generated/graphql';
import { Card } from '../molecules';

type WalletInfoCardType = {
  game: Omit<GameRow, 'ownerId' | 'private'>;
  walletInfo: WalletSummary;
};

const WalletInfoCard = ({ game, walletInfo }: WalletInfoCardType) => {
  //   const [startGame] = useStartGameMutation(); run next turn
  const { push } = useRouter();

  const handleButtonClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // await startGame({ variables: { gameId: game.id } });
    console.log('next turn ,  ', game.id);
    // push(`/game/${game.id}/wallet`);
  };

  return (
    <Card>
      <VStack>
        <Heading>Stan portfela i rozgrywki</Heading>
        <VStack>
          <HStack>
            <Text>Obecna data:</Text>
            <Text>{game.currentDate}</Text>
          </HStack>
          <HStack>
            <Text>Dostępne środki:</Text>
            <Text>
              {(walletInfo.availableMoney - walletInfo.blockedMoney).toFixed(2)}
            </Text>
          </HStack>
          <HStack>
            <Text>Zablokowane środki</Text>
            <Text>{walletInfo.blockedMoney.toFixed(2)}</Text>
          </HStack>
          <Button onClick={handleButtonClick}>Następna tura</Button>
        </VStack>
      </VStack>
    </Card>
  );
};

export default WalletInfoCard;
