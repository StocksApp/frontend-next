import React, { useRef, useEffect, useState } from 'react';

import {
  SimpleGrid,
  Text,
  Input,
  Select,
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  GridItem,
  Checkbox,
  Box,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useCreateSinglePlayerGameMutation } from '../../generated/graphql';
import { browsePageUrl } from '../../config/urls';
import { formatISO } from 'date-fns';
import { validateDatesOrder, validateDate } from '../../utils/form';
import UsersTable from '../molecules/UsersTable';
import { User } from '../../utils/interfaces';

type CreateGameFormValues = {
  from: string;
  to: string;
  initialWallet: string;
  turnDuration: string;
  markets: string[];
  private?: boolean;
  invitedPlayers?: string[];
};

export type CreateGameFormType = {
  single: boolean;
};

const CreateGameForm = ({ single }: CreateGameFormType) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    control,
  } = useForm<CreateGameFormValues>();
  const { push } = useRouter();

  const [createSingleGame, { loading }] = useCreateSinglePlayerGameMutation();
  const [invitedUsers, setInvitedUsers] = useState<User[]>([]);
  const fromDate = watch('from');

  const onSubmit = async (values: CreateGameFormValues) => {
    try {
      console.log(values);
      // await createSingleGame({
      //   variables: {
      //     ...values,
      //     initialWallet: parseInt(values.initialWallet, 10),
      //     turnDuration: parseInt(values.turnDuration, 10),
      //   },
      // });
      // push(browsePageUrl);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columnGap={16} rowGap={4} columns={{ base: 1, sm: 2 }}>
        <FormControl isInvalid={errors.from}>
          <FormLabel htmlFor="name">Data rozpoczęcia</FormLabel>{' '}
          <Input
            type="date"
            max={formatISO(Date.now(), { representation: 'date' })}
            {...register('from', {
              valueAsDate: true,
              deps: ['to'],
              required: { value: true, message: 'To pole jest obowiązkowe' },
              validate: (value) =>
                validateDate(value, 'Niepoprawny format daty'),
            })}
          />
          <FormErrorMessage>{errors.from?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.to}>
          <FormLabel htmlFor="to">Data zakończenia</FormLabel>{' '}
          <Input
            type="date"
            max={formatISO(Date.now(), { representation: 'date' })}
            {...register('to', {
              valueAsDate: true,
              required: { value: true, message: 'To pole jest obowiązkowe' },
              validate: {
                validateCorrectness: (value) =>
                  validateDate(value, 'Niepoprawny format daty'),
                validateOrder: (value) =>
                  validateDatesOrder(
                    fromDate,
                    value,
                    'End date must be after start date'
                  ),
              },
            })}
          />
          <FormErrorMessage>{errors.to?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.initialWallet}>
          <FormLabel htmlFor="initialWallet">
            Początkowa wartość portfela
          </FormLabel>
          <Input
            type="number"
            {...register('initialWallet', {
              required: { value: true, message: 'To pole jest obowiązkowe' },
              min: {
                value: 20000,
                message: 'Minimalna wartość portfela to 20 000',
              },
            })}
          />
          <FormErrorMessage>{errors.initialWallet?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.turnDuration}>
          <FormLabel htmlFor="turnDuration">Czas trwania tury</FormLabel>{' '}
          <Select
            {...register('turnDuration', {
              required: { value: true, message: 'To pole jest obowiązkowe' },
            })}
            placeholder="Wybierz czas"
          >
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <option key={index + 1} value={(index + 1) * 2}>
                  {`${(index + 1) * 2} dni`}
                </option>
              ))}
          </Select>
          <FormErrorMessage>{errors.turnDuration?.message}</FormErrorMessage>
        </FormControl>
        <GridItem colSpan={2}>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: 'To pole jest obowiązkowe' },
            }}
            name="markets"
            render={({ field: { ref, ...rest } }) => (
              <FormControl isInvalid={errors.markets}>
                <FormLabel htmlFor="markets">
                  Dostępne w rozgrywce rynki
                </FormLabel>
                <AutoComplete openOnFocus multiple {...rest}>
                  <AutoCompleteInput ref={ref}>
                    {({ tags }) =>
                      tags.map((tag, id) => (
                        <AutoCompleteTag
                          key={id}
                          label={tag.label}
                          onRemove={tag.onRemove}
                        />
                      ))
                    }
                  </AutoCompleteInput>
                  <FormErrorMessage>{errors.markets?.message}</FormErrorMessage>
                  <AutoCompleteList>
                    {[
                      'testtesttest1',
                      'testtesttest2',
                      'testtesttest3',
                      'testtesttest4',
                      'testtesttest5',
                      'testtesttest6',

                      'testtest11',
                    ].map((country, cid) => (
                      <AutoCompleteItem
                        key={`option-${cid}`}
                        value={country}
                        textTransform="capitalize"
                        _selected={{ bg: 'cyan.500' }}
                        _focus={{ bg: 'cyan.200' }}
                      >
                        {country}
                      </AutoCompleteItem>
                    ))}
                  </AutoCompleteList>
                </AutoComplete>
              </FormControl>
            )}
          />
        </GridItem>
        {!single && (
          <>
            <GridItem colSpan={2}>
              <FormControl display="grid" gridTemplateColumns="1fr 1fr">
                <FormLabel alignSelf="baseline" m={0}>
                  Gra prywatna
                </FormLabel>
                <Checkbox {...register('private')} justifySelf="center" />
                <FormErrorMessage>{errors.private?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <UsersTable
                title="Zaproszeni użytkownicy"
                users={invitedUsers}
                onAdd={() => console.log('Todo')}
                onDelete={(userId: string) =>
                  setInvitedUsers((users) =>
                    users.filter((user) => user.id !== userId)
                  )
                }
                onClear={() => setInvitedUsers([])}
              />
            </GridItem>
          </>
        )}
      </SimpleGrid>
      <Flex p={6} pb={0} justifyContent="center">
        <Button type="submit" isLoading={loading} px={20} py={2}>
          <Text mr={2}>Stwórz</Text>
        </Button>
      </Flex>
    </form>
  );
};

export default CreateGameForm;
