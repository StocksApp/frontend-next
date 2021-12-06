import NextAuth from 'next-auth';
import { JWT as NextJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
    id: string | undefined;
    email: string;
    userName: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends NextJWT {
    accessToken: string;
    refreshToken: string;
    user: { email: string; userName: string };
  }
}
