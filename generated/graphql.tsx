import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  LocalDate: string;
};

export type Marking = {
  __typename?: 'Marking';
  close: Scalars['Float'];
  high: Scalars['Float'];
  low: Scalars['Float'];
  open: Scalars['Float'];
  ticker: Scalars['String'];
  volume: Scalars['Int'];
};

export type MarkingAtDay = {
  __typename?: 'MarkingAtDay';
  date: Scalars['LocalDate'];
  marking: Marking;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Scalars['Int'];
  signIn: Scalars['Boolean'];
};

export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getMarkings: Array<MarkingAtDay>;
  stocksSummary: Array<StockSummary>;
};

export type QueryGetMarkingsArgs = {
  endDate?: Maybe<Scalars['LocalDate']>;
  startDate?: Maybe<Scalars['LocalDate']>;
  stock: Scalars['String'];
  ticker: Scalars['String'];
};

export type QueryStocksSummaryArgs = {
  stocks?: Maybe<Array<Scalars['String']>>;
};

export type SecurityInfo = {
  __typename?: 'SecurityInfo';
  endDate: Scalars['LocalDate'];
  startDate: Scalars['LocalDate'];
  ticker: Scalars['String'];
};

export type StockSummary = {
  __typename?: 'StockSummary';
  endDate: Scalars['LocalDate'];
  name: Scalars['String'];
  readableName: Scalars['String'];
  securities: Array<SecurityInfo>;
  startDate: Scalars['LocalDate'];
};

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: number;
};

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type SignInMutation = { __typename?: 'Mutation'; signIn: boolean };

export type GetMarketsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMarketsQuery = {
  __typename?: 'Query';
  stocksSummary: Array<{
    __typename?: 'StockSummary';
    name: string;
    readableName: string;
  }>;
};

export type GetMarkingsForTickerQueryVariables = Exact<{
  stock: Scalars['String'];
  ticker: Scalars['String'];
  endDate?: Maybe<Scalars['LocalDate']>;
  startDate?: Maybe<Scalars['LocalDate']>;
}>;

export type GetMarkingsForTickerQuery = {
  __typename?: 'Query';
  getMarkings: Array<{
    __typename?: 'MarkingAtDay';
    date: string;
    marking: {
      __typename?: 'Marking';
      open: number;
      low: number;
      high: number;
      close: number;
      volume: number;
    };
  }>;
};

export type GetTickersQueryVariables = Exact<{
  stocks?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type GetTickersQuery = {
  __typename?: 'Query';
  stocksSummary: Array<{
    __typename?: 'StockSummary';
    name: string;
    securities: Array<{ __typename?: 'SecurityInfo'; ticker: string }>;
  }>;
};

export type StocksSummaryQueryVariables = Exact<{
  stocks?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type StocksSummaryQuery = {
  __typename?: 'Query';
  stocksSummary: Array<{
    __typename?: 'StockSummary';
    name: string;
    startDate: string;
    endDate: string;
  }>;
};

export const CreateUserDocument = gql`
  mutation createUser($name: String!, $password: String!, $email: String!) {
    createUser(userName: $name, password: $password, email: $email)
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const SignInDocument = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const GetMarketsDocument = gql`
  query getMarkets {
    stocksSummary {
      name
      readableName
    }
  }
`;

/**
 * __useGetMarketsQuery__
 *
 * To run a query within a React component, call `useGetMarketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarketsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMarketsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMarketsQuery,
    GetMarketsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMarketsQuery, GetMarketsQueryVariables>(
    GetMarketsDocument,
    options
  );
}
export function useGetMarketsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMarketsQuery,
    GetMarketsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMarketsQuery, GetMarketsQueryVariables>(
    GetMarketsDocument,
    options
  );
}
export type GetMarketsQueryHookResult = ReturnType<typeof useGetMarketsQuery>;
export type GetMarketsLazyQueryHookResult = ReturnType<
  typeof useGetMarketsLazyQuery
>;
export type GetMarketsQueryResult = Apollo.QueryResult<
  GetMarketsQuery,
  GetMarketsQueryVariables
>;
export const GetMarkingsForTickerDocument = gql`
  query getMarkingsForTicker(
    $stock: String!
    $ticker: String!
    $endDate: LocalDate
    $startDate: LocalDate
  ) {
    getMarkings(
      stock: $stock
      ticker: $ticker
      startDate: $startDate
      endDate: $endDate
    ) {
      date
      marking {
        open
        low
        high
        close
        volume
      }
    }
  }
`;

/**
 * __useGetMarkingsForTickerQuery__
 *
 * To run a query within a React component, call `useGetMarkingsForTickerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarkingsForTickerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarkingsForTickerQuery({
 *   variables: {
 *      stock: // value for 'stock'
 *      ticker: // value for 'ticker'
 *      endDate: // value for 'endDate'
 *      startDate: // value for 'startDate'
 *   },
 * });
 */
export function useGetMarkingsForTickerQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMarkingsForTickerQuery,
    GetMarkingsForTickerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMarkingsForTickerQuery,
    GetMarkingsForTickerQueryVariables
  >(GetMarkingsForTickerDocument, options);
}
export function useGetMarkingsForTickerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMarkingsForTickerQuery,
    GetMarkingsForTickerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMarkingsForTickerQuery,
    GetMarkingsForTickerQueryVariables
  >(GetMarkingsForTickerDocument, options);
}
export type GetMarkingsForTickerQueryHookResult = ReturnType<
  typeof useGetMarkingsForTickerQuery
>;
export type GetMarkingsForTickerLazyQueryHookResult = ReturnType<
  typeof useGetMarkingsForTickerLazyQuery
>;
export type GetMarkingsForTickerQueryResult = Apollo.QueryResult<
  GetMarkingsForTickerQuery,
  GetMarkingsForTickerQueryVariables
>;
export const GetTickersDocument = gql`
  query getTickers($stocks: [String!]) {
    stocksSummary(stocks: $stocks) {
      name
      securities {
        ticker
      }
    }
  }
`;

/**
 * __useGetTickersQuery__
 *
 * To run a query within a React component, call `useGetTickersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTickersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTickersQuery({
 *   variables: {
 *      stocks: // value for 'stocks'
 *   },
 * });
 */
export function useGetTickersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetTickersQuery,
    GetTickersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTickersQuery, GetTickersQueryVariables>(
    GetTickersDocument,
    options
  );
}
export function useGetTickersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTickersQuery,
    GetTickersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTickersQuery, GetTickersQueryVariables>(
    GetTickersDocument,
    options
  );
}
export type GetTickersQueryHookResult = ReturnType<typeof useGetTickersQuery>;
export type GetTickersLazyQueryHookResult = ReturnType<
  typeof useGetTickersLazyQuery
>;
export type GetTickersQueryResult = Apollo.QueryResult<
  GetTickersQuery,
  GetTickersQueryVariables
>;
export const StocksSummaryDocument = gql`
  query stocksSummary($stocks: [String!]) {
    stocksSummary(stocks: $stocks) {
      name
      startDate
      endDate
    }
  }
`;

/**
 * __useStocksSummaryQuery__
 *
 * To run a query within a React component, call `useStocksSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useStocksSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStocksSummaryQuery({
 *   variables: {
 *      stocks: // value for 'stocks'
 *   },
 * });
 */
export function useStocksSummaryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    StocksSummaryQuery,
    StocksSummaryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StocksSummaryQuery, StocksSummaryQueryVariables>(
    StocksSummaryDocument,
    options
  );
}
export function useStocksSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    StocksSummaryQuery,
    StocksSummaryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StocksSummaryQuery, StocksSummaryQueryVariables>(
    StocksSummaryDocument,
    options
  );
}
export type StocksSummaryQueryHookResult = ReturnType<
  typeof useStocksSummaryQuery
>;
export type StocksSummaryLazyQueryHookResult = ReturnType<
  typeof useStocksSummaryLazyQuery
>;
export type StocksSummaryQueryResult = Apollo.QueryResult<
  StocksSummaryQuery,
  StocksSummaryQueryVariables
>;
