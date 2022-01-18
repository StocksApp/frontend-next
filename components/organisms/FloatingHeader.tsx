import React from 'react';
import {
  Flex,
  Avatar,
  Spacer,
  HStack,
  Link as ChakraLink,
  Center,
  Heading,
} from '@chakra-ui/react';
import Link from 'next/link';
import { links } from '../../config/urls';

const FloatingHeader = () => {
  return (
    <Center pos="sticky" w="100vw" p="5" zIndex={1}>
      <Flex
        w="60%"
        bg="gray.50"
        border="1px solid black"
        p="6"
        borderRadius="32"
        boxShadow="0px 7px 23px #444444aa"
        alignItems="center"
      >
        <Link href={links.landing}>
          <a>
            <Avatar />
          </a>
        </Link>
        <Heading ml={8}>StocksApp</Heading>
        <Spacer />
        <HStack spacing={8}>
          <Link href={links.stocks.browse} passHref>
            <ChakraLink
              py={2}
              px={8}
              borderRadius={16}
              border="1px solid #777777"
              _hover={{
                boxShadow: '0px 3px 14px #999999aa',
              }}
            >
              Notowania
            </ChakraLink>
          </Link>
          <Link href={links.login} passHref>
            <ChakraLink
              py={2}
              px={8}
              borderRadius={16}
              border="1px solid #777777"
              _hover={{
                boxShadow: '0px 3px 14px #999999aa',
              }}
            >
              Zaloguj
            </ChakraLink>
          </Link>
          <Link href={links.signUp} passHref>
            <ChakraLink
              py={2}
              px={8}
              borderRadius={16}
              border="1px solid #777777"
              _hover={{
                boxShadow: '0px 3px 14px #999999aa',
              }}
            >
              Zarejestruj
            </ChakraLink>
          </Link>
        </HStack>
      </Flex>
    </Center>
  );
};

export default FloatingHeader;
