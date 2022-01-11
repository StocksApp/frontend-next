import { getSingleValueFromQuery } from './url';

describe('Get Single Value From Query', () => {
  it('return single value if it exists ', () => {
    expect(getSingleValueFromQuery({ test: 'test' }, 'test')).toBe('test');
  });
  it('return single value if there are multiple values for key ', () => {
    expect(getSingleValueFromQuery({ test: ['test', 'bad'] }, 'test')).toBe(
      'test'
    );
  });
  it('return nothing if the value is missing ', () => {
    expect(getSingleValueFromQuery({ bad: ['test', 'bad'] }, 'test')).toBe(
      undefined
    );
  });
});
