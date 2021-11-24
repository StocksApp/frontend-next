import { NavOption } from './interfaces';

export const links = {
  game: {
    base: '/game',
    browse: '/game',
    create: '/game/create',
    join: '/game/join',
  },
  stocks: {
    base: '/stocks',
    browse: '/stocks',
    analysis: '/stocks/analysis',
  },
  transactions: {
    create: '/transaction/create',
    browse: '/transaction',
    history: '/transaction/history',
    base: '/transaction',
  },
  wallet: {
    overview: '/transaction/create',
    analysis: '/transaction',
    base: '/transaction',
  },
  strategies: {
    base: 'strategies',
    overview: 'strategies',
    offenses: 'strategies/offenses',
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
    href: string;
    links: NavOption[];
  }
> = {
  game: {
    name: 'gra',
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
    href: links.transactions.base,
    links: [
      {
        name: 'Stwórz',
        href: links.transactions.create,
      },
      {
        name: 'Aktywne',
        href: links.transactions.browse,
      },
      {
        name: 'Historia',
        href: links.transactions.history,
      },
    ],
  },
  wallet: {
    name: 'Portfel',
    href: links.wallet.base,
    links: [
      {
        name: 'Przeglądaj',
        href: links.wallet.overview,
      },
      {
        name: 'Analiza',
        href: links.wallet.analysis,
      },
    ],
  },
  strategies: {
    name: 'Strategie',
    href: links.strategies.base,
    links: [
      {
        name: 'Przeglądaj',
        href: links.strategies.overview,
      },
      {
        name: 'Wykroczenia',
        href: links.strategies.offenses,
      },
    ],
  },
};
