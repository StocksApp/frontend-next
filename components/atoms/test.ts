export const APP_VERSION = 'v1.0.0';

export const object = {
  whatever: '1',
  hejka: '2',
};

const valueGetter = (value: number) => value;

const value = valueGetter(parseInt(object.hejka, 10));
