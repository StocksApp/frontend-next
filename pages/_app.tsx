import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme/theme';
import { client } from '../utils/client';
import { ApolloProvider } from '@apollo/client';
import { CurrentGameContextProvider } from '../contexts/currentGameContext';
import { SessionProvider } from 'next-auth/react';
import { NextComponentType, NextPageContext } from 'next';
import Auth from '../components/Auth';

// eslint-disable-next-line @typescript-eslint/ban-types
export type WrappedComponent<P = {}> = NextComponentType<
  NextPageContext,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  P
> & {
  auth?: boolean;
};

const MyApp = ({
  Component,
  pageProps: initialPageProps,
}: AppProps & { Component: WrappedComponent }) => {
  const { session, ...pageProps } = initialPageProps;
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <CurrentGameContextProvider>
          <SessionProvider session={session}>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </SessionProvider>
        </CurrentGameContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};
export default MyApp;
