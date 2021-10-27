import { NextPage } from 'next';
import FloatingHeader from '../components/organisms/FloatingHeader';
import {
  Center,
  Heading,
  Text,
  Input,
  Button,
  useToast,
  Box,
  Link,
  Flex,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import Card from '../components/molecules/Card';

const Login: NextPage = () => {
  const toast = useToast();
  return (
    <Flex h="100vh" direction="column">
      <FloatingHeader />
      <Box zIndex={-1}>
        <Image src="/static/homik.jpg" layout="fill" alt="Hamsterdam" />
      </Box>
      <Center flexGrow={1} boxSizing="content-box">
        <Card>
          <Heading>Zarejestruj się z</Heading>
          <Text>Login</Text>
          <Input />
          <Text>Email</Text>
          <Input />
          <Text>Hasło</Text>
          <Input />
          <Button onClick={() => toast({ title: 'Jeszcze nie teraz' })}>
            Zaloguj
          </Button>
          <Text>
            Jeśli masz konto to się{' '}
            <NextLink href="/login">
              <Link color="teal.300">zaloguj</Link>
            </NextLink>
          </Text>
        </Card>
      </Center>
    </Flex>
  );
};

export default Login;
