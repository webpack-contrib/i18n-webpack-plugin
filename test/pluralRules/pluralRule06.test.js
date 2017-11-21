import pluralRule06 from '../../src/pluralRules/pluralRule06';

describe('pluralRule06', () => {
  it('should return 1 form if value ends in 1, excluding 11', () => {
    expect(pluralRule06(1)).toBe(0);
    expect(pluralRule06('21')).toBe(0);
    expect(pluralRule06(31)).toBe(0);
  });

  it('should return 2 form if value ends in 0 or ends in 11 - 19', () => {
    expect(pluralRule06()).toBe(1);
    expect(pluralRule06(0)).toBe(1);
    expect(pluralRule06('10')).toBe(1);
    expect(pluralRule06(11)).toBe(1);
    expect(pluralRule06(19)).toBe(1);
    expect(pluralRule06('50')).toBe(1);
    expect(pluralRule06(111)).toBe(1);
    expect(pluralRule06('119')).toBe(1);
  });

  it('should return 3 form for everything else', () => {
    expect(pluralRule06(2)).toBe(2);
    expect(pluralRule06(9)).toBe(2);
    expect(pluralRule06('22')).toBe(2);
  });
});
