export const isSameOrigin = (url: string) =>
  new URL(url).origin === window.location.origin;
