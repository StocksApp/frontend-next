import { NextPage } from 'next';
import SidebarLayout from '../../components/layouts/SidebarLayout';
import { Card } from '../../components/molecules';
import { VStack, Text, Heading, HStack } from '@chakra-ui/react';
import { BsPersonFill, BsPeopleFill } from 'react-icons/bs';
import { useState } from 'react';
import CreateGameForm from '../../components/organisms/CreateGameForm';

enum CreatedGameType {
  MULTI,
  SINGLE,
}

const SinglePlayer: NextPage = () => {
  const [createdGameType, setCreatedGameType] = useState<
    CreatedGameType | undefined
  >(undefined);
  console.log(createdGameType);
  return (
    <SidebarLayout>
      <Card h="full">
        <VStack
          h="full"
          w="full"
          alignContent="center"
          justifyContent="flex-start"
          gridRowGap={16}
        >
          <Heading>Stwórz grę</Heading>
          <HStack justifyContent="space-around" width="80%">
            <Card
              onClick={() => setCreatedGameType(CreatedGameType.SINGLE)}
              _hover={{
                bg: 'cyan.400',
                color: 'white',
                cursor: 'pointer',
              }}
              bg={
                createdGameType === CreatedGameType.SINGLE
                  ? 'cyan.500'
                  : 'white'
              }
            >
              <BsPersonFill fontSize={150} />
              <Text>Gra jednoosobowa</Text>
            </Card>
            <Card
              onClick={() => setCreatedGameType(CreatedGameType.MULTI)}
              _hover={{
                bg: 'cyan.400',
                color: 'white',
                cursor: 'pointer',
              }}
              bg={
                createdGameType === CreatedGameType.MULTI ? 'cyan.500' : 'white'
              }
            >
              <BsPeopleFill fontSize={150} />
              <Text>Gra wieloosobowa</Text>
            </Card>
          </HStack>

          {createdGameType !== undefined && (
            <Card>
              <CreateGameForm
                single={createdGameType === CreatedGameType.SINGLE}
              />
            </Card>
          )}
        </VStack>
      </Card>
    </SidebarLayout>
  );
};

export default SinglePlayer;
