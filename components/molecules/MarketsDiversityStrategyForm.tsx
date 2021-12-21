import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateStrategyMutation } from '../../generated/graphql';

type MarketsDiversityStrategyValues = {
  maxPercentOnMarket: number;
};

const MarketsDiversityStrategyForm = ({
  gameId,
  onClick,
}: {
  gameId: number;
  onClick: () => void;
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<MarketsDiversityStrategyValues>();

  const [createUserStrategy] = useCreateStrategyMutation();

  const onSubmit = async (values: MarketsDiversityStrategyValues) => {
    await createUserStrategy({
      variables: {
        configJson: JSON.stringify({
          maxPercentOnMarket: values.maxPercentOnMarket,
        }),
        strategyType: 'marketsDiversity',
        gameId,
      },
    });
    onClick();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.maxPercentOnMarket}>
        <FormLabel htmlFor="maxPercentOnMarket">
          Maksymalny % środków na jednym rynku
        </FormLabel>
        <Input
          type="number"
          {...register('maxPercentOnMarket', {
            required: { value: true, message: 'To pole jest obowiązkowe' },
            min: {
              value: 1,
              message: 'Minimalna wartość to 1%',
            },
            max: {
              value: 99,
              message: 'Maksymalna wartość to 99%',
            },
          })}
        />
        <FormErrorMessage>
          {errors.maxPercentOnMarket?.message}
        </FormErrorMessage>
      </FormControl>
      <Flex>
        <Center flex="1" h="75px">
          <Button type="submit">Dodaj</Button>
        </Center>
      </Flex>
    </form>
  );
};

export default MarketsDiversityStrategyForm;
