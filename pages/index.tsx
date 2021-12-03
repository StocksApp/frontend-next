import type { NextPage } from 'next';
import Head from 'next/head';
import { VStack, Heading } from '@chakra-ui/react';
import FloatingHeader from '../components/organisms/FloatingHeader';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Stocks app</title>
        <meta name="description" content="stocks simulator app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <FloatingHeader />
        <VStack w="full" pt={16}>
          <Heading>Landing Page w budowie</Heading>
        </VStack>
      </main>
    </div>
  );
};

export default Home;
