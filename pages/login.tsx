import { NextPage } from 'next';
import FloatingHeader from '../components/organisms/FloatingHeader';
import {
  VStack,
  Center,
  HStack,
  Heading,
  Text,
  Input,
  Button,
  useToast,
  Box,
} from '@chakra-ui/react';
import Image from 'next/image';

const Login: NextPage = () => {
  const toast = useToast();
  return (
    <>
      <FloatingHeader />
      <HStack paddingTop="40">
        <Center flexGrow={1}>
          <VStack align="left">
            <Heading>Miło Cię znowu widzieć</Heading>
            <Text>Podaj swój login i hasło</Text>
            <Text>Login</Text>
            <Input />
            <Text>Hasło</Text>
            <Input />
            <Button onClick={() => toast({ title: 'Jeszcze nie teraz' })}>
              Zaloguj
            </Button>
          </VStack>
        </Center>
        <Box w="50vw">
          <Image
            src="/static/loginLogo.jpeg"
            width="500px"
            height="400px"
            layout="responsive"
            alt="logo"
          />
        </Box>
      </HStack>
    </>
  );
};

export default Login;
