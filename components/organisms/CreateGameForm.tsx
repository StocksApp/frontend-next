import React, { useState, ReactNode } from 'react';

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
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  useCreateGameMutation,
  useGetMarketsQuery,
} from '../../generated/graphql';
import { formatISO, parse } from 'date-fns';
import { validateDatesOrder, validateDate } from '../../utils/form';
import { User } from '../../utils/interfaces';
import { links } from '../../config/urls';
import GenericTablePanel from '../molecules/GenericTablePanel';
import { FaTimes } from 'react-icons/fa';

type CreateGameFormValues = {
  from: string;
  to: string;
  initialWallet: string;
  turnDuration: string;
  stocks: string[];
  private: boolean;
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

  const [createGame, { loading }] = useCreateGameMutation();
  const { data: marketsQueryData } = useGetMarketsQuery();
  const stocks = marketsQueryData?.stocksSummary || [];

  const [invitedUsers, setInvitedUsers] = useState<User[]>([]);
  const fromDate = watch('from');

  const onSubmit = async (values: CreateGameFormValues) => {
    try {
      console.log(values);
      const { data } = await createGame({
        variables: {
          ...values,
          private: values.private === undefined ? true : values.private,
          initialWallet: parseInt(values.initialWallet, 10),
          turnDuration: parseInt(values.turnDuration, 10),
        },
      });
      if (!data?.createGame) throw new Error('Game couldnt be created');
      push(links.game.overview(`${data?.createGame}`));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columnGap={16} rowGap={4} columns={{ base: 1, sm: 2 }}>
        <FormControl isInvalid={!!errors.from}>
          <FormLabel htmlFor="name">Data rozpoczęcia</FormLabel>{' '}
          <Input
            type="date"
            max={formatISO(Date.now(), { representation: 'date' })}
            {...register('from', {
              deps: ['to'],
              required: { value: true, message: 'To pole jest obowiązkowe' },
              validate: (value) =>
                validateDate(
                  parse(value, 'y-MM-dd', new Date()),
                  'Niepoprawny format daty'
                ),
            })}
          />
          <FormErrorMessage>{errors.from?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.to}>
          <FormLabel htmlFor="to">Data zakończenia</FormLabel>{' '}
          <Input
            type="date"
            max={formatISO(Date.now(), { representation: 'date' })}
            {...register('to', {
              required: { value: true, message: 'To pole jest obowiązkowe' },
              validate: {
                validateCorrectness: (value) =>
                  validateDate(
                    parse(value, 'y-MM-dd', new Date()),
                    'Niepoprawny format daty'
                  ),
                validateOrder: (value) =>
                  validateDatesOrder(
                    parse(fromDate, 'y-MM-dd', new Date()),
                    parse(value, 'y-MM-dd', new Date()),
                    'End date must be after start date'
                  ),
              },
            })}
          />
          <FormErrorMessage>{errors.to?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.initialWallet}>
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
        <FormControl isInvalid={!!errors.turnDuration}>
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
            name="stocks"
            render={({ field: { ref, ...rest } }) => (
              <FormControl isInvalid={!!errors.stocks}>
                <FormLabel htmlFor="stocks">
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
                  <FormErrorMessage>
                    {(errors.stocks as undefined | FieldError)?.message}
                  </FormErrorMessage>
                  <AutoCompleteList>
                    {stocks.map((stock, cid) => (
                      <AutoCompleteItem
                        key={`option-${cid}`}
                        value={stock.name}
                        textTransform="capitalize"
                        _selected={{ bg: 'cyan.500' }}
                        _focus={{ bg: 'cyan.200' }}
                      >
                        {stock.readableName}
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
                <Checkbox
                  {...(register('private'), { required: true })}
                  justifySelf="center"
                />
                <FormErrorMessage>{errors.private?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <GenericTablePanel
                title="Zaproszeni użytkownicy"
                actionNodes={
                  <>
                    <Button onClick={() => 1 + 1}>Dodaj</Button>
                    <Button onClick={() => setInvitedUsers([])}>Wyczyść</Button>
                  </>
                }
              >
                <GenericTablePanel.Table<[string, ReactNode]>
                  tableHeaders={['Nazwa', 'Akcje']}
                  tableValues={invitedUsers.map((user, index) => [
                    user.name,
                    <FaTimes
                      key={index}
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        setInvitedUsers((users) =>
                          users.filter(
                            (invitedUser) => invitedUser.id !== user.id
                          )
                        )
                      }
                    />,
                  ])}
                />
              </GenericTablePanel>
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
