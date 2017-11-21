import pluralRule09 from '../../src/pluralRules/pluralRule09';

describe('pluralRule09', () => {
  it('should return 1 form if value is 1', () => {
    expect(pluralRule09(1)).toBe(0);
    expect(pluralRule09('1')).toBe(0);
  });

  it('should return 2 form if value ends in 2 - 4, excluding 12 - 14', () => {
    expect(pluralRule09(2)).toBe(1);
    expect(pluralRule09(3)).toBe(1);
    expect(pluralRule09(4)).toBe(1);
    expect(pluralRule09('22')).toBe(1);
    expect(pluralRule09('23')).toBe(1);
    expect(pluralRule09('24')).toBe(1);
  });

  it('should return 3 form for everything else ', () => {
    expect(pluralRule09()).toBe(2);
    expect(pluralRule09(0)).toBe(2);
    expect(pluralRule09('5')).toBe(2);
    expect(pluralRule09(12)).toBe(2);
    expect(pluralRule09(13)).toBe(2);
    expect(pluralRule09(14)).toBe(2);
  });
});
