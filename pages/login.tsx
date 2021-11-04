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
import { useSignInMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { browsePageUrl } from '../config/urls';

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const toast = useToast();
  const [signIn, { data, loading }] = useSignInMutation();
  const { push } = useRouter();

  const { register, handleSubmit } = useForm<LoginFormValues>();
  const onSubmit = async (formValues: LoginFormValues) => {
    try {
      await signIn({ variables: { ...formValues } });
    } catch (e) {
      toast({ description: 'Something went wrong' });
    }
  };

  useEffect(() => {
    if (data?.signIn) {
      localStorage.setItem('userLoggedIn', 'true');
      push(browsePageUrl);
    } else if (data?.signIn === false) {
      toast({ description: 'Niepoprawne dane logowania' });
    }
  }, [push, data, toast]);
  return (
    <>
      <FloatingHeader />
      <HStack paddingTop="40">
        <Center flexGrow={1}>
          <VStack align="left">
            <Heading>Miło Cię znowu widzieć</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Text>Email</Text>
              <Input type="email" {...register('email', { required: true })} />
              <Text>Hasło</Text>
              <Input
                type="password"
                {...register('password', { required: true })}
              />
              <Button type="submit" isLoading={loading}>
                Zaloguj
              </Button>
            </form>
            <Text>Podaj swój login i hasło</Text>
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
