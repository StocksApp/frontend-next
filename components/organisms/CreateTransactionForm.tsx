import React, { useState, useEffect } from 'react';

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
  useToast,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  GetActiveTransactionsDocument,
  useCreateTransactionMutation,
  useGetMarketsQuery,
  useGetTickersLazyQuery,
} from '../../generated/graphql';
import { formatISO, parse } from 'date-fns';
import { validateDatesOrder, validateDate } from '../../utils/form';
// import { User } from '../../utils/interfaces';
import { links } from '../../config/urls';
// import GenericTablePanel from '../molecules/GenericTablePanel';
// import { FaTimes } from 'react-icons/fa';

type CreateGameFormValues = {
  from: string;
  market: string;
  ticker: string;
  quantity: number;
};

const CreateTransactionForm = ({ gameId }: { gameId: number }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<CreateGameFormValues>();
  const selectedMarket = watch('market');
  const [createTransaction, { loading }] = useCreateTransactionMutation({
    refetchQueries: [GetActiveTransactionsDocument],
  });
  const { data: marketsQueryData } = useGetMarketsQuery();
  const [getTickers, { data: tickers }] = useGetTickersLazyQuery();
  const stocks = marketsQueryData?.stocksSummary || [];
  const toast = useToast();

  useEffect(() => {
    if (selectedMarket) {
      getTickers({ variables: { stocks: [selectedMarket] } });
    }
  }, [selectedMarket, getTickers]);

  const onSubmit = async (values: CreateGameFormValues) => {
    try {
      const { data } = await createTransaction({
        variables: {
          ...values,
          quantity: parseInt(`${values.quantity}`, 10),
          gameId,
          isSell: false,
        },
      });
      if (!data?.addTransactionDefinition)
        throw new Error('Game couldnt be created');
      toast({ description: 'Tworzenie transakcji zakończone powodzeniem' });
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

        <FormControl isInvalid={!!errors.quantity}>
          <FormLabel htmlFor="initialWallet">Ilość akcji</FormLabel>
          <Input
            type="number"
            {...register('quantity', {
              required: { value: true, message: 'To pole jest obowiązkowe' },
            })}
          />
          <FormErrorMessage>{errors.quantity?.message}</FormErrorMessage>
        </FormControl>
        <GridItem colSpan={2}>
          <FormControl isInvalid={!!errors.market}>
            <FormLabel htmlFor="market">Rynek</FormLabel>{' '}
            <Select
              {...register('market', {
                required: { value: true, message: 'To pole jest obowiązkowe' },
              })}
              placeholder="Wybierz rynek"
            >
              {stocks.map((stock, index) => (
                <option key={index + 1} value={stock.name}>
                  {stock.readableName}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.market?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isInvalid={!!errors.ticker}>
            <FormLabel htmlFor="ticker">Aktywa</FormLabel>{' '}
            <Select
              {...register('ticker', {
                required: { value: true, message: 'To pole jest obowiązkowe' },
              })}
              placeholder="Wybierz aktywa"
            >
              {tickers?.stocksSummary?.map((stock, index) =>
                stock.securities.map((security) => (
                  <option key={index + 1} value={stock.name}>
                    {security.ticker}
                  </option>
                ))
              )}
            </Select>
            <FormErrorMessage>{errors.ticker?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
      </SimpleGrid>
      <Flex p={6} pb={0} justifyContent="center">
        <Button type="submit" isLoading={loading} px={20} py={2}>
          <Text mr={2}>Stwórz</Text>
        </Button>
      </Flex>
    </form>
  );
};

export default CreateTransactionForm;
