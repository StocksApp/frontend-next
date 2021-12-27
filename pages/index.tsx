import type { NextPage } from 'next';
import Head from 'next/head';
import { VStack, Heading, Button } from '@chakra-ui/react';
import FloatingHeader from '../components/organisms/FloatingHeader';

const Home: NextPage = () => {
  const onClick = async () => {
    const ts = Array(24)
      .fill(0)
      .map((_, i) => i + Math.random() / 5);
    const res = await fetch('/api/arima', {
      body: JSON.stringify({ inputData: ts }),
      method: 'POST',
    });
    const preds = await res.json();
    console.log(preds);
  };

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
          <Button onClick={onClick}>Arima</Button>
        </VStack>
      </main>
    </div>
  );
};

export default Home;
