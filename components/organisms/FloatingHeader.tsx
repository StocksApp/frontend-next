import React from 'react';
import {
  Flex,
  Avatar,
  Spacer,
  HStack,
  Link as ChakraLink,
  Center,
  Heading,
  background,
} from '@chakra-ui/react';
import Link from 'next/link';
import {
  loginPageUrl,
  signUpPageUrl,
  stocksPageUrl,
  landingPageUrl,
} from '../../config/urls';

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
        <Link href={landingPageUrl}>
          <a>
            <Avatar />
          </a>
        </Link>
        <Heading ml={8}>LOGO</Heading>
        <Spacer />
        <HStack spacing={8}>
          <Link href={stocksPageUrl} passHref>
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
          <Link href={loginPageUrl} passHref>
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
          <Link href={signUpPageUrl} passHref>
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
