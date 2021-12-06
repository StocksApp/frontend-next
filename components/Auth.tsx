import { Spinner } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import React, { ReactNode, useEffect } from 'react';

const Auth = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const isLoggedIn = session?.user;

  useEffect(() => {
    if (status !== 'loading' && !isLoggedIn) signIn();
  }, [isLoggedIn, status]);

  if (isLoggedIn) return <>{children}</>;

  return <Spinner size="lg" height="full" width="full" />;
};

export default Auth;
