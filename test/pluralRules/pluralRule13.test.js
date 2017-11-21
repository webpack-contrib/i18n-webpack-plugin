import pluralRule13 from '../../src/pluralRules/pluralRule13';

describe('pluralRule13', () => {
  it('should return 1 form if value is 1', () => {
    expect(pluralRule13(1)).toBe(0);
    expect(pluralRule13('1')).toBe(0);
  });

  it('should return 2 form if value is 0 or ends in 01 - 10, excluding 1', () => {
    expect(pluralRule13()).toBe(1);
    expect(pluralRule13(0)).toBe(1);
    expect(pluralRule13('0')).toBe(1);
    expect(pluralRule13(2)).toBe(1);
    expect(pluralRule13(10)).toBe(1);
    expect(pluralRule13('101')).toBe(1);
    expect(pluralRule13(110)).toBe(1);
  });

  it('should return 3 form if value ends in 11 - 19', () => {
    expect(pluralRule13(11)).toBe(2);
    expect(pluralRule13(19)).toBe(2);
    expect(pluralRule13('111')).toBe(2);
    expect(pluralRule13('119')).toBe(2);
  });

  it('should return 4 form for everything else', () => {
    expect(pluralRule13(20)).toBe(3);
    expect(pluralRule13('100')).toBe(3);
  });
});
