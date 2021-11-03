import { NavOption } from './interfaces';

export const sidebarMenuLinks: NavOption[] = [
  { text: 'notowania', href: '/stocks' },
  { text: 'gra', href: '/game' },
];

export const gameMenuLinks: NavOption[] = [
  { text: 'Szukaj', href: '/game' },
  { text: 'Jednosobowa', href: '/game/single' },
  { text: 'Wieloosobowa', href: '/game/multiplayer' },
];
