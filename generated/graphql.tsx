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
};

export type Link = {
  __typename?: 'Link';
  description: Scalars['String'];
  id: Scalars['Int'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allLinks: Array<Link>;
  getUser?: Maybe<User>;
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
};

export type AllLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllLinksQuery = { __typename?: 'Query', allLinks: Array<{ __typename?: 'Link', description: string }> };


export const AllLinksDocument = gql`
    query allLinks {
  allLinks {
    description
  }
}
    `;

/**
 * __useAllLinksQuery__
 *
 * To run a query within a React component, call `useAllLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllLinksQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllLinksQuery(baseOptions?: Apollo.QueryHookOptions<AllLinksQuery, AllLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllLinksQuery, AllLinksQueryVariables>(AllLinksDocument, options);
      }
export function useAllLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllLinksQuery, AllLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllLinksQuery, AllLinksQueryVariables>(AllLinksDocument, options);
        }
export type AllLinksQueryHookResult = ReturnType<typeof useAllLinksQuery>;
export type AllLinksLazyQueryHookResult = ReturnType<typeof useAllLinksLazyQuery>;
export type AllLinksQueryResult = Apollo.QueryResult<AllLinksQuery, AllLinksQueryVariables>;