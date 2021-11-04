import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme/theme';
import { client } from '../utils/client';
import { ApolloProvider } from '@apollo/client';
import { CurrentGameContextProvider } from '../contexts/currentGameContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <CurrentGameContextProvider>
          <Component {...pageProps} />
        </CurrentGameContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};
export default MyApp;
