import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const httpLink = new HttpLink({
  uri: publicRuntimeConfig?.API_URL,
});

const authLink = setContext(async (request) => {
  const session = await getSession();
  return {
    ...request,
    headers: {
      authorization: session && `Bearer ${session.accessToken}`,
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink]),
});
