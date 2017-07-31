import pluralRule05 from '../../src/pluralRules/pluralRule05';

describe('pluralRule05', () => {
  it('should return 1 form if value is 1', () => {
    expect(pluralRule05(1)).toBe(0);
    expect(pluralRule05('1')).toBe(0);
  });

  it('should return 2 form if value is 0 or ends in 01 - 19, excluding 1', () => {
    expect(pluralRule05()).toBe(1);
    expect(pluralRule05(0)).toBe(1);
    expect(pluralRule05(2)).toBe(1);
    expect(pluralRule05('3')).toBe(1);
    expect(pluralRule05(10)).toBe(1);
    expect(pluralRule05('15')).toBe(1);
    expect(pluralRule05(19)).toBe(1);
    expect(pluralRule05(101)).toBe(1);
    expect(pluralRule05('119')).toBe(1);
  });

  it('should return 3 form for everything else', () => {
    expect(pluralRule05(20)).toBe(2);
    expect(pluralRule05('21')).toBe(2);
    expect(pluralRule05(39)).toBe(2);
    expect(pluralRule05('50')).toBe(2);
    expect(pluralRule05(100)).toBe(2);
    expect(pluralRule05('120')).toBe(2);
  });
});
