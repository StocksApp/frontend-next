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
  VStack,
  ModalOverlay,
  ModalHeader,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import Card from '../components/molecules/Card';
import { loginPageUrl } from '../config/urls';
import { useForm } from 'react-hook-form';
import { useCreateUserMutation } from '../generated/graphql';
import { useRouter } from 'next/router';

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
    <Flex h="100vh" direction="column">
      <Modal isOpen={!!data} onClose={() => push(loginPageUrl)}>
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
      <FloatingHeader />
      <Box zIndex={-1}>
        <Image src="/static/homik.jpg" layout="fill" alt="Hamsterdam" />
      </Box>
      <Center flexGrow={1} boxSizing="content-box">
        <Card>
          <Heading>Zarejestruj się</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={3}>
              <Text>Login</Text>
              <Input {...register('login', { required: true })} />
              <Text>Email</Text>
              <Input type="email" {...register('email', { required: true })} />
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

          <Text>
            Jeśli masz konto to się{' '}
            <NextLink href={loginPageUrl}>
              <Link color="teal.300">zaloguj</Link>
            </NextLink>
          </Text>
        </Card>
      </Center>
    </Flex>
  );
};

export default Login;
