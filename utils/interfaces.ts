export type NavOption = {
  name: string;
  href: string | ((id: string) => string);
};
export type User = {
  name: string;
  id: string;
};
