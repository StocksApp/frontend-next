import React, { ComponentPropsWithoutRef } from 'react';
import { VStack } from '@chakra-ui/react';

const Card = (props: ComponentPropsWithoutRef<typeof VStack>) => {
  return (
    <VStack
      bg="white"
      px="14"
      py="12"
      boxShadow="0px 7px 23px #444444aa"
      borderRadius="16"
      {...props}
    ></VStack>
  );
};

export default Card;
