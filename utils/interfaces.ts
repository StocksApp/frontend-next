import { Profile, Session } from 'next-auth';

export type NavOption = {
  name: string;
  href: string | ((id: string) => string);
};
export type User = {
  name: string;
  id: string;
};

export type Credentials = {
  userName?: string;
  email?: string;
  password: string;
};

export interface UserSession extends Session {
  errorCode?: string;
}

export type ExtendedSession = UserSession | null | undefined;
export type SessionStatus = 'authenticated' | 'unauthenticated' | 'loading';
