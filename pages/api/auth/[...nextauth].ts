import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { links } from '../../../config/urls';
import {
  SignInWithUserNameDocument,
  SignInWithEmailDocument,
  SignInWithEmailMutationResult,
  SignInWithUserNameMutationResult,
} from '../../../generated/graphql';
import { client } from '../../../utils/client';
import getConfig from 'next/config';

type Data = {
  name: string;
};

const getOptions = (): NextAuthOptions => ({
  pages: {
    signIn: links.login,
  },
  session: {
    maxAge: 14 * 24 * 24 * 60,
  },
  providers: [
    CredentialProvider({
      id: 'loginWithUserName',
      name: 'loginWithUserName',
      credentials: {
        userName: { label: 'UserName', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const signInResult = await client.mutate({
          mutation: SignInWithUserNameDocument,
          variables: credentials,
        });
        const { data, error } =
          signInResult as SignInWithUserNameMutationResult;
        if (error) throw Error(error.message);
        return {
          ...data?.loginByUserName.tokens,
          ...data?.loginByUserName.userInfo,
        };
      },
    }),
    CredentialProvider({
      id: 'loginWithEmail',
      name: 'loginWithEmail',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const signInResult = await client.mutate({
          mutation: SignInWithEmailDocument,
          variables: credentials,
        });
        const { data, error } = signInResult as SignInWithEmailMutationResult;
        if (error) throw Error(error.message);
        if (!data) throw Error('catchAll');
        const { accessToken, refreshToken } = data.loginByMail.tokens;
        const { id, email, userName } = data.loginByMail.userInfo;
        return {
          accessToken,
          refreshToken,
          id,
          email,
          userName,
        };
      },
    }),
  ],
  secret: getConfig().SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = {
          email: user.email,
          userName: user.userName,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
});

const requestHandler = (req: NextApiRequest, res: NextApiResponse<Data>) =>
  NextAuth(req, res, getOptions());

export default requestHandler;
