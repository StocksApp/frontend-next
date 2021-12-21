import { NextPage, GetServerSidePropsContext } from 'next';
import FloatingHeader from '../components/organisms/FloatingHeader';
import {
  VStack,
  Center,
  HStack,
  Heading,
  Input,
  Button,
  useToast,
  Box,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Card } from '../components/molecules';
import { getSession, signIn } from 'next-auth/react';
import { links } from '../config/urls';
import useCallbackUrl from '../hooks/useCallbackUrl';

type LoginFormValues = {
  emailOrUserName: string;
  password: string;
};

enum IdentificationValueType {
  EMAIL,
  USERNAME,
}

const Login: NextPage = () => {
  const toast = useToast();
  const { push } = useRouter();
  const { callbackUrl } = useCallbackUrl();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const onSubmit = async (formValues: LoginFormValues) => {
    try {
      const identificationValueType = formValues.emailOrUserName.includes('@')
        ? IdentificationValueType.EMAIL
        : IdentificationValueType.USERNAME; // TODO check with better regex
      const result = await signIn<'credentials'>(
        identificationValueType === IdentificationValueType.EMAIL
          ? 'loginWithEmail'
          : 'loginWithUserName',
        {
          redirect: false,
          callbackUrl: callbackUrl,
          password: formValues.password,
          email: formValues.emailOrUserName,
        }
      );
      if (!result || result.error) throw new Error(result?.error || 'catchAll');
      push(result?.url || links.landing);
    } catch (e) {
      console.log(e);
      setError('emailOrUserName', { message: 'Błędne dane użytkownika' });
      setError('password', { message: 'Błędne dane użytkownika' });
    }
  };

  return (
    <>
      <FloatingHeader />
      <HStack pt={8}>
        <Center flexGrow={1}>
          <Card>
            <VStack align="left" spacing={8}>
              <Heading>Miło Cię znowu widzieć</Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                  <FormControl isInvalid={!!errors.emailOrUserName}>
                    <FormLabel htmlFor="emailOrUserName">
                      Nazwa użytkownika lub email
                    </FormLabel>
                    <Input
                      type="text"
                      {...register('emailOrUserName', {
                        required: {
                          value: true,
                          message: 'To pole jest obowiązkowe',
                        },
                      })}
                    />

                    <FormErrorMessage>
                      {errors.emailOrUserName?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.password}>
                    <FormLabel htmlFor="password">Hasło</FormLabel>
                    <Input
                      type="password"
                      {...register('password', {
                        required: {
                          value: true,
                          message: 'To pole jest obowiązkowe',
                        },
                      })}
                    />

                    <FormErrorMessage>
                      {errors.password?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <Button type="submit">Zaloguj</Button>
                </VStack>
              </form>
            </VStack>
          </Card>
        </Center>
        <Box w="50vw">
          <Image
            src="/static/user-login.svg"
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  const isUserLoggedIn = Boolean(session?.user);

  if (isUserLoggedIn) {
    return {
      redirect: {
        destination: links.game.browse,
      },
    };
  }
  return {
    props: {},
  };
};

export default Login;
