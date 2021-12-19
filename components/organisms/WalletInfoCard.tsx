import { Heading, HStack, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { GameRow, WalletSummary } from '../../generated/graphql';
import { Card } from '../molecules';

type WalletInfoCardType = {
  game: Omit<GameRow, 'ownerId' | 'private'>;
  walletInfo: WalletSummary;
};

const WalletInfoCard = ({ game, walletInfo }: WalletInfoCardType) => {
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
        </VStack>
      </VStack>
    </Card>
  );
};

export default WalletInfoCard;
