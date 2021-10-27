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
import { landingPageUrl, loginPageUrl, signUpPageUrl } from '../../config/urls';

const FloatingHeader = () => {
  return (
    <Center pos="sticky" w="100vw" p="5" zIndex={1}>
      <Flex
        w="60%"
        bg="gray.50"
        border="1px solid black"
        p="6"
        borderRadius="16"
        boxShadow="0px 7px 23px #f0c000aa"
      >
        <Link href={landingPageUrl}>
          <a>
            <Avatar src="/static/tracz.jpg" />
          </a>
        </Link>
        <Spacer />
        <HStack>
          <Link href={landingPageUrl} passHref>
            <ChakraLink>Notowania</ChakraLink>
          </Link>
          <Link href={loginPageUrl} passHref>
            <ChakraLink>Zaloguj</ChakraLink>
          </Link>
          <Link href={signUpPageUrl} passHref>
            <ChakraLink>Zarejestruj</ChakraLink>
          </Link>
        </HStack>
      </Flex>
    </Center>
  );
};

export default FloatingHeader;
