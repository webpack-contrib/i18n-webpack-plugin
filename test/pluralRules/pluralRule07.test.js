import pluralRule07 from '../../src/pluralRules/pluralRule07';

describe('pluralRule07', () => {
  it('should return 1 form if value ends in 1, excluding 11', () => {
    expect(pluralRule07(1)).toBe(0);
    expect(pluralRule07('21')).toBe(0);
    expect(pluralRule07(101)).toBe(0);
    expect(pluralRule07(121)).toBe(0);
  });

  it('should return 2 form if value ends in 2 - 4, excluding 12 - 14', () => {
    expect(pluralRule07(2)).toBe(1);
    expect(pluralRule07(3)).toBe(1);
    expect(pluralRule07(4)).toBe(1);
    expect(pluralRule07('22')).toBe(1);
    expect(pluralRule07('33')).toBe(1);
    expect(pluralRule07('44')).toBe(1);
  });

  it('should return 3 form for everything else', () => {
    expect(pluralRule07()).toBe(2);
    expect(pluralRule07(0)).toBe(2);
    expect(pluralRule07('11')).toBe(2);
    expect(pluralRule07('12')).toBe(2);
    expect(pluralRule07('13')).toBe(2);
    expect(pluralRule07('14')).toBe(2);
    expect(pluralRule07(111)).toBe(2);
    expect(pluralRule07(112)).toBe(2);
    expect(pluralRule07(113)).toBe(2);
    expect(pluralRule07(114)).toBe(2);
  });
});
