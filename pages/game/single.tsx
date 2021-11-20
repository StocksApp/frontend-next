import { NextPage } from 'next';
import SidebarLayout from '../../components/layouts/SidebarLayout';
import { gameMenuLinks } from '../../utils/links';
import { Card } from '../../components/molecules';
import { useForm } from 'react-hook-form';
import {
  VStack,
  SimpleGrid,
  Input,
  Button,
  Text,
  Select,
  Flex,
} from '@chakra-ui/react';
import { useCreateSingleplayerGameMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { browsePageUrl } from '../../config/urls';

type SinglePlayerFormValues = {
  from: string;
  to: string;
  initialWallet: string;
  turnDuration: string;
};

const SinglePlayer: NextPage = () => {
  const { handleSubmit, register } = useForm<SinglePlayerFormValues>();
  const { push } = useRouter();

  const [createSingleGame, { loading }] = useCreateSingleplayerGameMutation();

  const onSubmit = async (values: SinglePlayerFormValues) => {
    try {
      await createSingleGame({
        variables: {
          ...values,
          initialWallet: parseInt(values.initialWallet, 10),
          turnDuration: parseInt(values.turnDuration, 10),
        },
      });
      push(browsePageUrl);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SidebarLayout>
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

export default SinglePlayer;
