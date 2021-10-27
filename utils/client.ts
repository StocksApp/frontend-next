import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const httpLink = new HttpLink({ uri: publicRuntimeConfig?.API_URL });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([httpLink]),
});
