import { GetServerSidePropsContext, NextPage } from 'next';
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
  VStack,
  ModalOverlay,
  ModalHeader,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  HStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import Card from '../components/molecules/Card';
import { links } from '../config/urls';
import { useForm } from 'react-hook-form';
import { useCreateUserMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

type RegisterFormValues = {
  login: string;
  password: string;
  email: string;
};

const Login: NextPage = () => {
  const toast = useToast();
  const [createUser, { data, loading }] = useCreateUserMutation();
  const { push } = useRouter();

  const { register, handleSubmit } = useForm<RegisterFormValues>();
  const onSubmit = async (formValues: RegisterFormValues) => {
    try {
      await createUser({
        variables: { ...formValues, name: formValues.login },
      });
    } catch (e) {
      toast({ description: 'Something went wrong' });
    }
  };
  return (
    <>
      <FloatingHeader />
      <Modal isOpen={!!data} onClose={() => push(links.login)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sukces</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Rejestracja zakończona powodzeniem. Po zamknięciu zostaniesz
              przeniesiony na strone logowania
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
      <HStack pt={8}>
        <Center flexGrow={1}>
          <Card minW="520px">
            <VStack align="left" spacing={8}>
              <Heading textAlign="center">Zarejestruj się</Heading>
              <Box w="full">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <VStack spacing={3}>
                    <Text>Login</Text>
                    <Input {...register('login', { required: true })} />
                    <Text>Email</Text>
                    <Input
                      type="email"
                      {...register('email', { required: true })}
                    />
                    <Text>Hasło</Text>
                    <Input
                      type="password"
                      {...register('password', { required: true })}
                    />
                    <Button type="submit" isLoading={loading}>
                      Zarejestruj
                    </Button>
                  </VStack>
                </form>
              </Box>

              <Text>
                Jeśli masz konto to się{' '}
                <NextLink href={links.login}>
                  <Link color="teal.300">zaloguj</Link>
                </NextLink>
              </Text>
            </VStack>
          </Card>
        </Center>
        <Box w="50vw">
          <Image
            src="/static/padlock.svg"
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
