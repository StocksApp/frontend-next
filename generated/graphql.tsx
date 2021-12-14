import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  LocalDate: string;
};

export type GameParticipationRow = {
  __typename?: 'GameParticipationRow';
  gameId: Scalars['Int'];
  id: Scalars['Int'];
  userId: Scalars['Int'];
};

export type GameRow = {
  __typename?: 'GameRow';
  currentDate: Scalars['LocalDate'];
  from: Scalars['LocalDate'];
  id: Scalars['Int'];
  initialWalletValue: Scalars['Int'];
  isFinished: Scalars['Boolean'];
  isStarted: Scalars['Boolean'];
  markets: Array<MarketsRow>;
  ownerId: Scalars['Int'];
  private: Scalars['Boolean'];
  to: Scalars['LocalDate'];
  turnDuration: Scalars['Int'];
};

export type LoginInfo = {
  __typename?: 'LoginInfo';
  tokens: Tokens;
  userInfo: User;
};

export type MarketsRow = {
  __typename?: 'MarketsRow';
  id: Scalars['Int'];
  name: Scalars['String'];
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
  addTransactionDefinition: TransactionRow;
  createGame: Scalars['Int'];
  createUser: LoginInfo;
  createUserStrategy: UserStrategyRow;
  deleteUserStrategy: Scalars['Int'];
  joinGame: GameParticipationRow;
  loginByMail: LoginInfo;
  loginByUserName: LoginInfo;
  refreshToken: LoginInfo;
  startGame: Scalars['String'];
};


export type MutationAddTransactionDefinitionArgs = {
  activationLimit?: Maybe<Scalars['Float']>;
  endDate?: Maybe<Scalars['LocalDate']>;
  gameId: Scalars['Int'];
  isSellTransaction: Scalars['Boolean'];
  marketName: Scalars['String'];
  minQuantity?: Maybe<Scalars['Int']>;
  priceLimit?: Maybe<Scalars['Float']>;
  quantity: Scalars['Int'];
  startDate: Scalars['LocalDate'];
  ticker: Scalars['String'];
};


export type MutationCreateGameArgs = {
  endDate: Scalars['LocalDate'];
  isPrivate: Scalars['Boolean'];
  startDate: Scalars['LocalDate'];
  stocks: Array<Scalars['String']>;
  turnDuration: Scalars['Int'];
  userIds?: Maybe<Array<Scalars['Int']>>;
  walletValue: Scalars['Int'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};


export type MutationCreateUserStrategyArgs = {
  configJson: Scalars['String'];
  gameId: Scalars['Int'];
  strategyType: Scalars['String'];
};


export type MutationDeleteUserStrategyArgs = {
  userStrategyId: Scalars['Int'];
};


export type MutationJoinGameArgs = {
  gameId: Scalars['Int'];
};


export type MutationLoginByMailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginByUserNameArgs = {
  password: Scalars['String'];
  userName: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationStartGameArgs = {
  gameId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getJoinableGames: Array<GameRow>;
  getMarkings: Array<MarkingAtDay>;
  getUserStrategies: Array<UserStrategyRow>;
  getUsersGames: Array<GameRow>;
  stocksSummary: Array<StockSummary>;
};


export type QueryGetMarkingsArgs = {
  endDate?: Maybe<Scalars['LocalDate']>;
  startDate?: Maybe<Scalars['LocalDate']>;
  stock: Scalars['String'];
  ticker: Scalars['String'];
};


export type QueryGetUserStrategiesArgs = {
  gameId: Scalars['Int'];
};


export type QueryGetUsersGamesArgs = {
  onlyActive?: Maybe<Scalars['Boolean']>;
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

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type TransactionRow = {
  __typename?: 'TransactionRow';
  activationLimit?: Maybe<Scalars['Float']>;
  from: Scalars['LocalDate'];
  id: Scalars['Int'];
  isCancelled: Scalars['Boolean'];
  isFullified: Scalars['Boolean'];
  isSellTransaction: Scalars['Boolean'];
  minQuantity?: Maybe<Scalars['Int']>;
  priceLimit?: Maybe<Scalars['Float']>;
  quantity: Scalars['Int'];
  ticker: Scalars['String'];
  to?: Maybe<Scalars['LocalDate']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  userName: Scalars['String'];
};

export type UserStrategyRow = {
  __typename?: 'UserStrategyRow';
  configJson: Scalars['String'];
  id: Scalars['Int'];
  strategyId: Scalars['Int'];
  userGameId: Scalars['Int'];
};

export type CreateGameMutationVariables = Exact<{
  from: Scalars['LocalDate'];
  initialWallet: Scalars['Int'];
  private: Scalars['Boolean'];
  to: Scalars['LocalDate'];
  turnDuration: Scalars['Int'];
  stocks: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: number };

export type CreateStrategyMutationVariables = Exact<{
  gameId: Scalars['Int'];
  strategyType: Scalars['String'];
  configJson: Scalars['String'];
}>;


export type CreateStrategyMutation = { __typename?: 'Mutation', createUserStrategy: { __typename?: 'UserStrategyRow', id: number, configJson: string } };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'LoginInfo', userInfo: { __typename?: 'User', id: number, email: string, userName: string } } };

export type SignInWithEmailMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInWithEmailMutation = { __typename?: 'Mutation', loginByMail: { __typename?: 'LoginInfo', tokens: { __typename?: 'Tokens', accessToken: string, refreshToken: string }, userInfo: { __typename?: 'User', userName: string, email: string, id: number } } };

export type SignInWithUserNameMutationVariables = Exact<{
  userName: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInWithUserNameMutation = { __typename?: 'Mutation', loginByUserName: { __typename?: 'LoginInfo', tokens: { __typename?: 'Tokens', accessToken: string, refreshToken: string }, userInfo: { __typename?: 'User', userName: string, email: string, id: number } } };

export type GetMarketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMarketsQuery = { __typename?: 'Query', stocksSummary: Array<{ __typename?: 'StockSummary', name: string, readableName: string }> };

export type GetMarkingsForTickerQueryVariables = Exact<{
  stock: Scalars['String'];
  ticker: Scalars['String'];
  endDate?: Maybe<Scalars['LocalDate']>;
  startDate?: Maybe<Scalars['LocalDate']>;
}>;


export type GetMarkingsForTickerQuery = { __typename?: 'Query', getMarkings: Array<{ __typename?: 'MarkingAtDay', date: string, marking: { __typename?: 'Marking', open: number, low: number, high: number, close: number, volume: number } }> };

export type MarketsNamesQueryVariables = Exact<{
  stocks?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type MarketsNamesQuery = { __typename?: 'Query', stocksSummary: Array<{ __typename?: 'StockSummary', name: string, readableName: string }> };

export type GetTickersQueryVariables = Exact<{
  stocks?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetTickersQuery = { __typename?: 'Query', stocksSummary: Array<{ __typename?: 'StockSummary', name: string, securities: Array<{ __typename?: 'SecurityInfo', ticker: string }> }> };

export type GetUserGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserGamesQuery = { __typename?: 'Query', getUsersGames: Array<{ __typename?: 'GameRow', currentDate: string, turnDuration: number, from: string, id: number, initialWalletValue: number, isFinished: boolean, isStarted: boolean, to: string, markets: Array<{ __typename?: 'MarketsRow', id: number, name: string }> }> };

export type GetJoinableGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJoinableGamesQuery = { __typename?: 'Query', getJoinableGames: Array<{ __typename?: 'GameRow', id: number, from: string, to: string, initialWalletValue: number, turnDuration: number }> };

export type StocksSummaryQueryVariables = Exact<{
  stocks?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type StocksSummaryQuery = { __typename?: 'Query', stocksSummary: Array<{ __typename?: 'StockSummary', name: string, startDate: string, endDate: string }> };


export const CreateGameDocument = gql`
    mutation createGame($from: LocalDate!, $initialWallet: Int!, $private: Boolean!, $to: LocalDate!, $turnDuration: Int!, $stocks: [String!]!) {
  createGame(
    startDate: $from
    endDate: $to
    walletValue: $initialWallet
    isPrivate: $private
    turnDuration: $turnDuration
    stocks: $stocks
  )
}
    `;
export type CreateGameMutationFn = Apollo.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      from: // value for 'from'
 *      initialWallet: // value for 'initialWallet'
 *      private: // value for 'private'
 *      to: // value for 'to'
 *      turnDuration: // value for 'turnDuration'
 *      stocks: // value for 'stocks'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, options);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const CreateStrategyDocument = gql`
    mutation createStrategy($gameId: Int!, $strategyType: String!, $configJson: String!) {
  createUserStrategy(
    gameId: $gameId
    strategyType: $strategyType
    configJson: $configJson
  ) {
    id
    configJson
  }
}
    `;
export type CreateStrategyMutationFn = Apollo.MutationFunction<CreateStrategyMutation, CreateStrategyMutationVariables>;

/**
 * __useCreateStrategyMutation__
 *
 * To run a mutation, you first call `useCreateStrategyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStrategyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStrategyMutation, { data, loading, error }] = useCreateStrategyMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      strategyType: // value for 'strategyType'
 *      configJson: // value for 'configJson'
 *   },
 * });
 */
export function useCreateStrategyMutation(baseOptions?: Apollo.MutationHookOptions<CreateStrategyMutation, CreateStrategyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStrategyMutation, CreateStrategyMutationVariables>(CreateStrategyDocument, options);
      }
export type CreateStrategyMutationHookResult = ReturnType<typeof useCreateStrategyMutation>;
export type CreateStrategyMutationResult = Apollo.MutationResult<CreateStrategyMutation>;
export type CreateStrategyMutationOptions = Apollo.BaseMutationOptions<CreateStrategyMutation, CreateStrategyMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($name: String!, $password: String!, $email: String!) {
  createUser(userName: $name, password: $password, email: $email) {
    userInfo {
      id
      email
      userName
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

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
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const SignInWithEmailDocument = gql`
    mutation signInWithEmail($email: String!, $password: String!) {
  loginByMail(email: $email, password: $password) {
    tokens {
      accessToken
      refreshToken
    }
    userInfo {
      userName
      email
      id
    }
  }
}
    `;
export type SignInWithEmailMutationFn = Apollo.MutationFunction<SignInWithEmailMutation, SignInWithEmailMutationVariables>;

/**
 * __useSignInWithEmailMutation__
 *
 * To run a mutation, you first call `useSignInWithEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInWithEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInWithEmailMutation, { data, loading, error }] = useSignInWithEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInWithEmailMutation(baseOptions?: Apollo.MutationHookOptions<SignInWithEmailMutation, SignInWithEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInWithEmailMutation, SignInWithEmailMutationVariables>(SignInWithEmailDocument, options);
      }
export type SignInWithEmailMutationHookResult = ReturnType<typeof useSignInWithEmailMutation>;
export type SignInWithEmailMutationResult = Apollo.MutationResult<SignInWithEmailMutation>;
export type SignInWithEmailMutationOptions = Apollo.BaseMutationOptions<SignInWithEmailMutation, SignInWithEmailMutationVariables>;
export const SignInWithUserNameDocument = gql`
    mutation signInWithUserName($userName: String!, $password: String!) {
  loginByUserName(userName: $userName, password: $password) {
    tokens {
      accessToken
      refreshToken
    }
    userInfo {
      userName
      email
      id
    }
  }
}
    `;
export type SignInWithUserNameMutationFn = Apollo.MutationFunction<SignInWithUserNameMutation, SignInWithUserNameMutationVariables>;

/**
 * __useSignInWithUserNameMutation__
 *
 * To run a mutation, you first call `useSignInWithUserNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInWithUserNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInWithUserNameMutation, { data, loading, error }] = useSignInWithUserNameMutation({
 *   variables: {
 *      userName: // value for 'userName'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInWithUserNameMutation(baseOptions?: Apollo.MutationHookOptions<SignInWithUserNameMutation, SignInWithUserNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInWithUserNameMutation, SignInWithUserNameMutationVariables>(SignInWithUserNameDocument, options);
      }
export type SignInWithUserNameMutationHookResult = ReturnType<typeof useSignInWithUserNameMutation>;
export type SignInWithUserNameMutationResult = Apollo.MutationResult<SignInWithUserNameMutation>;
export type SignInWithUserNameMutationOptions = Apollo.BaseMutationOptions<SignInWithUserNameMutation, SignInWithUserNameMutationVariables>;
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
export function useGetMarketsQuery(baseOptions?: Apollo.QueryHookOptions<GetMarketsQuery, GetMarketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMarketsQuery, GetMarketsQueryVariables>(GetMarketsDocument, options);
      }
export function useGetMarketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMarketsQuery, GetMarketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMarketsQuery, GetMarketsQueryVariables>(GetMarketsDocument, options);
        }
export type GetMarketsQueryHookResult = ReturnType<typeof useGetMarketsQuery>;
export type GetMarketsLazyQueryHookResult = ReturnType<typeof useGetMarketsLazyQuery>;
export type GetMarketsQueryResult = Apollo.QueryResult<GetMarketsQuery, GetMarketsQueryVariables>;
export const GetMarkingsForTickerDocument = gql`
    query getMarkingsForTicker($stock: String!, $ticker: String!, $endDate: LocalDate, $startDate: LocalDate) {
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
export function useGetMarkingsForTickerQuery(baseOptions: Apollo.QueryHookOptions<GetMarkingsForTickerQuery, GetMarkingsForTickerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMarkingsForTickerQuery, GetMarkingsForTickerQueryVariables>(GetMarkingsForTickerDocument, options);
      }
export function useGetMarkingsForTickerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMarkingsForTickerQuery, GetMarkingsForTickerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMarkingsForTickerQuery, GetMarkingsForTickerQueryVariables>(GetMarkingsForTickerDocument, options);
        }
export type GetMarkingsForTickerQueryHookResult = ReturnType<typeof useGetMarkingsForTickerQuery>;
export type GetMarkingsForTickerLazyQueryHookResult = ReturnType<typeof useGetMarkingsForTickerLazyQuery>;
export type GetMarkingsForTickerQueryResult = Apollo.QueryResult<GetMarkingsForTickerQuery, GetMarkingsForTickerQueryVariables>;
export const MarketsNamesDocument = gql`
    query MarketsNames($stocks: [String!]) {
  stocksSummary(stocks: $stocks) {
    name
    readableName
  }
}
    `;

/**
 * __useMarketsNamesQuery__
 *
 * To run a query within a React component, call `useMarketsNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketsNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketsNamesQuery({
 *   variables: {
 *      stocks: // value for 'stocks'
 *   },
 * });
 */
export function useMarketsNamesQuery(baseOptions?: Apollo.QueryHookOptions<MarketsNamesQuery, MarketsNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MarketsNamesQuery, MarketsNamesQueryVariables>(MarketsNamesDocument, options);
      }
export function useMarketsNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketsNamesQuery, MarketsNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MarketsNamesQuery, MarketsNamesQueryVariables>(MarketsNamesDocument, options);
        }
export type MarketsNamesQueryHookResult = ReturnType<typeof useMarketsNamesQuery>;
export type MarketsNamesLazyQueryHookResult = ReturnType<typeof useMarketsNamesLazyQuery>;
export type MarketsNamesQueryResult = Apollo.QueryResult<MarketsNamesQuery, MarketsNamesQueryVariables>;
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
export function useGetTickersQuery(baseOptions?: Apollo.QueryHookOptions<GetTickersQuery, GetTickersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTickersQuery, GetTickersQueryVariables>(GetTickersDocument, options);
      }
export function useGetTickersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTickersQuery, GetTickersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTickersQuery, GetTickersQueryVariables>(GetTickersDocument, options);
        }
export type GetTickersQueryHookResult = ReturnType<typeof useGetTickersQuery>;
export type GetTickersLazyQueryHookResult = ReturnType<typeof useGetTickersLazyQuery>;
export type GetTickersQueryResult = Apollo.QueryResult<GetTickersQuery, GetTickersQueryVariables>;
export const GetUserGamesDocument = gql`
    query getUserGames {
  getUsersGames {
    currentDate
    turnDuration
    from
    id
    initialWalletValue
    isFinished
    isStarted
    markets {
      id
      name
    }
    to
  }
}
    `;

/**
 * __useGetUserGamesQuery__
 *
 * To run a query within a React component, call `useGetUserGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserGamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserGamesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserGamesQuery, GetUserGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserGamesQuery, GetUserGamesQueryVariables>(GetUserGamesDocument, options);
      }
export function useGetUserGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserGamesQuery, GetUserGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserGamesQuery, GetUserGamesQueryVariables>(GetUserGamesDocument, options);
        }
export type GetUserGamesQueryHookResult = ReturnType<typeof useGetUserGamesQuery>;
export type GetUserGamesLazyQueryHookResult = ReturnType<typeof useGetUserGamesLazyQuery>;
export type GetUserGamesQueryResult = Apollo.QueryResult<GetUserGamesQuery, GetUserGamesQueryVariables>;
export const GetJoinableGamesDocument = gql`
    query getJoinableGames {
  getJoinableGames {
    id
    from
    to
    initialWalletValue
    turnDuration
  }
}
    `;

/**
 * __useGetJoinableGamesQuery__
 *
 * To run a query within a React component, call `useGetJoinableGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJoinableGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJoinableGamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetJoinableGamesQuery(baseOptions?: Apollo.QueryHookOptions<GetJoinableGamesQuery, GetJoinableGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJoinableGamesQuery, GetJoinableGamesQueryVariables>(GetJoinableGamesDocument, options);
      }
export function useGetJoinableGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJoinableGamesQuery, GetJoinableGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJoinableGamesQuery, GetJoinableGamesQueryVariables>(GetJoinableGamesDocument, options);
        }
export type GetJoinableGamesQueryHookResult = ReturnType<typeof useGetJoinableGamesQuery>;
export type GetJoinableGamesLazyQueryHookResult = ReturnType<typeof useGetJoinableGamesLazyQuery>;
export type GetJoinableGamesQueryResult = Apollo.QueryResult<GetJoinableGamesQuery, GetJoinableGamesQueryVariables>;
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
export function useStocksSummaryQuery(baseOptions?: Apollo.QueryHookOptions<StocksSummaryQuery, StocksSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StocksSummaryQuery, StocksSummaryQueryVariables>(StocksSummaryDocument, options);
      }
export function useStocksSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StocksSummaryQuery, StocksSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StocksSummaryQuery, StocksSummaryQueryVariables>(StocksSummaryDocument, options);
        }
export type StocksSummaryQueryHookResult = ReturnType<typeof useStocksSummaryQuery>;
export type StocksSummaryLazyQueryHookResult = ReturnType<typeof useStocksSummaryLazyQuery>;
export type StocksSummaryQueryResult = Apollo.QueryResult<StocksSummaryQuery, StocksSummaryQueryVariables>;