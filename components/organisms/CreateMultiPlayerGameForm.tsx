import React from 'react';

import {
  SimpleGrid,
  Text,
  Input,
  Select,
  Flex,
  Button,
  Checkbox,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  useCreateMultiplayerGameMutation,
  ListJoinableGamesDocument,
} from '../../generated/graphql';
import { browsePageUrl } from '../../config/urls';

type MultiPlayerFormValues = {
  from: string;
  to: string;
  initialWallet: string;
  turnDuration: string;
  private: boolean;
};

const CreateMultiPlayerGameForm = () => {
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
  );
};

export default CreateMultiPlayerGameForm;
