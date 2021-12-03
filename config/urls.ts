import { NavOption } from '../utils/interfaces';

export const links = {
  landing: '/',
  login: '/login',
  signUp: '/sign-up',
  game: {
    base: '/game',
    browse: '/game',
    overview: (id: string) => `/game/${id}`,
    create: '/game/create',
    join: '/game/join',
    transactions: {
      create: (id: string) => `/game/${id}/transaction/create`,
      browse: (id: string) => `/game/${id}/transaction`,
      history: (id: string) => `/game/${id}/transaction/history`,
      base: (id: string) => `/game/${id}/transaction`,
    },
    wallet: {
      overview: (id: string) => `/game/${id}/wallet`,
      analysis: (id: string) => `/game/${id}/wallet/overwiev`,
      base: (id: string) => `/game/${id}/wallet`,
    },
    strategies: {
      base: (id: string) => `/game/${id}/strategies`,
      overview: (id: string) => `/game/${id}/strategies`,
      offenses: (id: string) => `/game/${id}/strategies/offenses`,
    },
  },
  stocks: {
    base: '/stocks',
    browse: '/stocks',
    analysis: '/stocks/analysis',
  },
  user: {
    overwiev: 'user',
  },
};

// blank means that no children string is blank
export const sidebarMenuLinks: Record<
  string,
  {
    name: string;
    href: string | ((id: string) => string);
    links: NavOption[];
  }
> = {
  game: {
    name: 'Gra',
    href: links.game.base,
    links: [
      {
        name: 'Stwórz',
        href: links.game.create,
      },
      {
        name: 'Szukaj',
        href: links.game.browse,
      },
    ],
  },
  transactions: {
    name: 'Transakcje',
    href: links.game.transactions.base,
    links: [
      {
        name: 'Stwórz',
        href: links.game.transactions.create,
      },
      {
        name: 'Aktywne',
        href: links.game.transactions.browse,
      },
      {
        name: 'Historia',
        href: links.game.transactions.history,
      },
    ],
  },
  wallet: {
    name: 'Portfel',
    href: links.game.wallet.base,
    links: [
      {
        name: 'Przeglądaj',
        href: links.game.wallet.overview,
      },
      {
        name: 'Analiza',
        href: links.game.wallet.analysis,
      },
    ],
  },
  strategies: {
    name: 'Strategie',
    href: links.game.strategies.base,
    links: [
      {
        name: 'Przeglądaj',
        href: links.game.strategies.overview,
      },
      {
        name: 'Wykroczenia',
        href: links.game.strategies.offenses,
      },
    ],
  },
};
