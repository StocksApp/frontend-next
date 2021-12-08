import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
    id: number;
    email: string;
    userName: string;
  }
  interface Session {
    accessToken: string;
    user: { email: string; userName: string; id: number };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    user: { email: string; userName: string; id: number };
  }
}
