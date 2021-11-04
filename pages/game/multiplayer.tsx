import { NextPage } from 'next';
import SidebarLayout from '../../components/layouts/SidebarLayout';
import { gameMenuLinks } from '../../utils/links';
import {
  useCreateMultiplayerGameMutation,
  ListJoinableGamesDocument,
} from '../../generated/graphql';
import { Card } from '../../components/molecules';
import { useForm } from 'react-hook-form';
import {
  VStack,
  SimpleGrid,
  Text,
  Input,
  Select,
  Flex,
  Button,
  Checkbox,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { browsePageUrl } from '../../config/urls';

type MultiPlayerFormValues = {
  from: string;
  to: string;
  initialWallet: string;
  turnDuration: string;
  private: boolean;
};

const MultiPlayer: NextPage = () => {
  const { handleSubmit, register } = useForm<MultiPlayerFormValues>();
  const { push } = useRouter();

  const [createMultiplayerGame, { loading }] = useCreateMultiplayerGameMutation(
    {
      refetchQueries: [{ query: ListJoinableGamesDocument }],
    }
  );

  const onSubmit = async (values: MultiPlayerFormValues) => {
    await createMultiplayerGame({
      variables: {
        ...values,
        initialWallet: parseInt(values.initialWallet, 10),
        turnDuration: parseInt(values.turnDuration, 10),
      },
    });
    push(browsePageUrl);
  };
  return (
    <SidebarLayout tabs={gameMenuLinks}>
      <Card h="full">
        <VStack h="full" w="full" alignContent="center" justifyContent="center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid gridGap={2} columns={{ base: 1, sm: 2 }}>
              <Text>Data rozpoczęcia</Text>
              <Input type="date" {...register('from', { required: true })} />
              <Text>Data zakończenia</Text>
              <Input type="date" {...register('to', { required: true })} />
              <Text>Początkowa wartość portfela</Text>
              <Input
                type="number"
                {...register('initialWallet', { required: true })}
              />
              <Text>Czas trwania tury</Text>
              <Select {...register('turnDuration')}>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <option key={index + 1} value={(index + 1) * 2}>
                      {`${(index + 1) * 2} dni`}
                    </option>
                  ))}
              </Select>
              <Text>Prywatna rozgrywka</Text>
              <Checkbox {...register('private')} justifySelf="center" />
            </SimpleGrid>
            <Flex p={6} justifyContent="center">
              <Button type="submit" isLoading={loading} px={20} py={2}>
                <Text mr={2}>Stwórz</Text>
              </Button>
            </Flex>
          </form>
        </VStack>
      </Card>
    </SidebarLayout>
  );
};

export default MultiPlayer;
