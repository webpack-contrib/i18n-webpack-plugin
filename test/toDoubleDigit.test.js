import toDoubleDigit from '../src/toDoubleDigit';

describe('toDoubleDigit', () => {
  it('should return `01` for `1`', () => {
    expect(toDoubleDigit(1)).toBe('01');
  });

  it('should return `10` for `10`', () => {
    expect(toDoubleDigit(10)).toBe('10');
  });
});
