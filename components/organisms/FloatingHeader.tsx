import React from 'react';
import {
  Flex,
  Avatar,
  Spacer,
  HStack,
  Link as ChakraLink,
  Center,
} from '@chakra-ui/react';
import Link from 'next/link';

const FloatingHeader = () => {
  return (
    <Center pos="sticky" w="100vw" top="5" zIndex={1}>
      <Flex
        w="60%"
        bg="gray.50"
        border="1px solid black"
        p="6"
        borderRadius="16"
        boxShadow="0px 7px 23px #f0c000aa"
      >
        <Link href="/">
          <a>
            <Avatar src="/static/tracz.jpg" />
          </a>
        </Link>
        <Spacer />
        <HStack>
          <Link href="/stocks" passHref>
            <ChakraLink>Notowania</ChakraLink>
          </Link>
          <Link href="login" passHref>
            <ChakraLink>Zaloguj</ChakraLink>
          </Link>
          <Link href="sign_up" passHref>
            <ChakraLink>Zarejestruj</ChakraLink>
          </Link>
        </HStack>
      </Flex>
    </Center>
  );
};

export default FloatingHeader;
