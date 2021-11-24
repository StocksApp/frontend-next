import { Card } from '../components/molecules';
import { BiError } from 'react-icons/bi';
import { Flex, Heading } from '@chakra-ui/react';

const ErrorPage = () => {
  return (
    <Card h="100vh" m={4}>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <BiError fontSize={336} />
        <Heading fontSize={108}>404</Heading>
        Nie znalezionio strony! Spokojnie nasi deweloperzy już nad tym pracują.
      </Flex>
    </Card>
  );
};

export default ErrorPage;
