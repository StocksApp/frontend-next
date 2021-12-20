import React, { useState, useEffect, useRef } from 'react';

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
  useToast,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

import { useForm, Controller, FieldError } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  GameRow,
  GetActiveTransactionsDocument,
  useCreateTransactionMutation,
  useGetMarketsQuery,
  useGetTickersLazyQuery,
  GetWalletSummaryDocument,
} from '../../generated/graphql';
import { formatISO, parse } from 'date-fns';
import { validateDatesOrder, validateDate } from '../../utils/form';
// import { User } from '../../utils/interfaces';
import { links } from '../../config/urls';
import { useCurrentGameContext } from '../../contexts/currentGameContext';
import CustomRadioGroup from '../molecules/transaction/GameTypeRadio';

type CreateTransactionFormValues = {
  from: string;
  to: string;
  market: string;
  ticker: string;
  quantity: number;
  transactionKind: 'sell' | 'buy';
  minQuantity?: number;
  priceLimit?: number;
  activationLimit?: number;
};

const CreateTransactionForm = ({
  game,
}: {
  game: Omit<GameRow, 'ownerId' | 'private'>;
}) => {
  const [selectedTab, setSelectedTab] = useState<number | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
    control,
    getValues,
  } = useForm<CreateTransactionFormValues>({
    defaultValues: {
      from: game?.currentDate,
      to: game?.to,
    },
  });
  const selectedMarket = watch('market');
  const [createTransaction, { loading }] = useCreateTransactionMutation({
    refetchQueries: [
      { query: GetActiveTransactionsDocument },
      { query: GetWalletSummaryDocument },
    ],
  });
  const { data: marketsQueryData } = useGetMarketsQuery();
  const [getTickers, { data: tickers }] = useGetTickersLazyQuery();
  const stocks = marketsQueryData?.stocksSummary || [];
  const toast = useToast();

  const transactionStartDate = watch('from');
  const transactionKind = watch('transactionKind');
  const transactionQuantity = watch('quantity');

  useEffect(() => {
    switch (selectedTab) {
      case 0:
      case 1:
      case 2:
        reset({
          ...getValues(),
          activationLimit: undefined,
          priceLimit: undefined,
          minQuantity: undefined,
        });
        break;
      default:
        break;
    }
  }, [selectedTab, getValues, reset]);

  useEffect(() => {
    if (selectedMarket) {
      getTickers({ variables: { stocks: [selectedMarket] } });
    }
  }, [selectedMarket, getTickers]);

  const onSubmit = async (values: CreateTransactionFormValues) => {
    try {
      const { data } = await createTransaction({
        variables: {
          ...values,
          quantity: parseInt(`${values.quantity}`, 10),
          minQuantity: parseInt(`${values.minQuantity}`, 10),
          priceLimit: parseInt(`${values.priceLimit}`, 10),
          activationLimit: parseInt(`${values.priceLimit}`, 10),
          gameId: game?.id,
          isSell: values.transactionKind === 'sell',
        },
      });
      if (!data?.addTransactionDefinition)
        throw new Error('Game couldnt be created');
      toast({ description: 'Tworzenie transakcji zakończone powodzeniem' });
    } catch (e) {
      console.log(e);
    }
  };

  if (!game) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columnGap={16} rowGap={4} columns={{ base: 1, sm: 2 }}>
        <FormControl isInvalid={!!errors.from}>
          <FormLabel htmlFor="from">Data rozpoczęcia</FormLabel>{' '}
          <Input
            type="date"
            min={game.currentDate}
            max={game.to}
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
          <FormLabel htmlFor="namendDatee">Data zakończenia</FormLabel>{' '}
          <Input
            type="date"
            min={transactionStartDate}
            max={game.to}
            {...register('to', {
              deps: ['to'],
              required: { value: true, message: 'To pole jest obowiązkowe' },
              validate: {
                validateCorrectness: (value) =>
                  validateDate(
                    parse(value, 'y-MM-dd', new Date()),
                    'Niepoprawny format daty'
                  ),
                validateOrder: (value) =>
                  validateDatesOrder(
                    parse(transactionStartDate, 'y-MM-dd', new Date()),
                    parse(value, 'y-MM-dd', new Date()),
                    'End date must be after start date'
                  ),
              },
            })}
          />
          <FormErrorMessage>{errors.to?.message}</FormErrorMessage>
        </FormControl>

        <GridItem colSpan={2}>
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
        </GridItem>

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
                <option key={`market ${index + 1}`} value={stock.name}>
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
                stock.securities.map((security, tickerIndex) => (
                  <option
                    key={`market ${index + 1} ticker ${tickerIndex + 1}`}
                    value={security.ticker}
                  >
                    {security.ticker}
                  </option>
                ))
              )}
            </Select>
            <FormErrorMessage>{errors.ticker?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: 'To pole jest obowiązkowe' },
            }}
            name="transactionKind"
            render={({ field }) => (
              <FormControl isInvalid={!!errors.transactionKind}>
                <FormLabel htmlFor="stocks">
                  Dostępne w rozgrywce rynki
                </FormLabel>
                <CustomRadioGroup
                  options={[
                    { label: 'Kupno', value: 'buy' },
                    { label: 'Sprzedaż', value: 'sell' },
                  ]}
                  {...field}
                />

                <FormErrorMessage>
                  {(errors.transactionKind as undefined | FieldError)?.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
        </GridItem>
        {transactionKind && (
          <GridItem colSpan={2}>
            <Tabs
              colorScheme="cyan"
              isFitted
              border="1px solid"
              borderColor="gray.200"
              p={2}
              borderRadius="md"
              isLazy
              lazyBehavior="unmount"
              onChange={(index) => setSelectedTab(index)}
            >
              <TabList>
                <Tab whiteSpace="nowrap">Po każdej cenie</Tab>
                <Tab whiteSpace="nowrap">Z limitem ceny</Tab>
                <Tab whiteSpace="nowrap">Z limitem aktywacji</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <FormControl isInvalid={!!errors.minQuantity}>
                    <FormLabel htmlFor="minQuantity">
                      Minimalna wielkość pojedynczej operacji
                    </FormLabel>
                    <Input
                      type="number"
                      {...register('minQuantity', {
                        validate: {
                          validateTransactionQuantity: (value) =>
                            transactionQuantity >= (value ?? 0) ||
                            'Wartość nie może być większa od rozmiaru transakcji',
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.minQuantity?.message}
                    </FormErrorMessage>
                  </FormControl>
                </TabPanel>
                <TabPanel>
                  <FormControl isInvalid={!!errors.priceLimit}>
                    <FormLabel htmlFor="priceLimit">Limit ceny</FormLabel>
                    <Input
                      type="number"
                      {...register('priceLimit', {
                        validate: {
                          validateRequired: (value) =>
                            selectedTab !== 1 ||
                            !!value ||
                            'To pole jest obowiązkowe',
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.priceLimit?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.minQuantity}>
                    <FormLabel htmlFor="minQuantity">
                      Minimalna wielkość pojedynczej operacji
                    </FormLabel>
                    <Input
                      type="number"
                      {...register('minQuantity', {
                        validate: {
                          validateTransactionQuantity: (value) =>
                            transactionQuantity >= (value ?? 0) ||
                            'Wartość nie może być większa od rozmiaru transakcji',
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.minQuantity?.message}
                    </FormErrorMessage>
                  </FormControl>
                </TabPanel>
                <TabPanel>
                  <FormControl isInvalid={!!errors.activationLimit}>
                    <FormLabel htmlFor="activationLimit">
                      Limit aktywacji
                    </FormLabel>
                    <Input
                      type="number"
                      {...register('activationLimit', {
                        validate: {
                          validateRequired: (value) =>
                            selectedTab !== 2 ||
                            !!value ||
                            'To pole jest obowiązkowe',
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.activationLimit?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.priceLimit}>
                    <FormLabel htmlFor="priceLimit">Limit ceny</FormLabel>
                    <Input type="number" {...register('priceLimit')} />
                    <FormErrorMessage>
                      {errors.priceLimit?.message}
                    </FormErrorMessage>
                  </FormControl>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
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

export default CreateTransactionForm;
