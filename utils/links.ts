import { NavOption } from "./interfaces";

export const links = {
  game: {
    base: '/game',
    browse: '/game',
    single: '/game/single',
    multiplayer: '/game/multiplayer'
  },
  stocks: {
    base: '/stocks',
    browse: '/stocks',
    analysis: '/stocks/analysis'
  }
}

// blank means that no children string is blank
export const sidebarMenuLinks: Record<string, {
  name: string,
  href: string,
  links: NavOption[],
}> = {
  game: {
    name: 'gra',
    href: links.game.base,
    links: [
      {
        name: 'Szukaj',
        href: links.game.browse,
      },
      {
        name: 'Jednosobowa',
        href: links.game.single,
      },
      {
        name: 'Wieloosobowa',
        href: links.game.multiplayer,
      }
    ]
  }
};

