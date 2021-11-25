import { Card } from '../molecules';
import { VStack, HStack, Heading, Text } from '@chakra-ui/react';

const GameInfoCard = () => {
  return (
    <Card>
      <VStack>
        <Heading>Parametry rozgrywki</Heading>
        <VStack>
          <HStack>
            <Text>Od</Text>
            <Text>mock</Text>
          </HStack>
          <HStack>
            <Text>Do</Text>
            <Text>mock</Text>
          </HStack>
          <HStack>
            <Text>Od</Text>
            <Text>mock</Text>
          </HStack>
          <HStack>
            <Text>Od</Text>
            <Text>mock</Text>
          </HStack>
        </VStack>
      </VStack>
    </Card>
  );
};

export default GameInfoCard;
