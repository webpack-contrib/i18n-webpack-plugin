import pluralRule08 from '../../src/pluralRules/pluralRule08';

describe('pluralRule08', () => {
  it('should return 1 form if value is 1', () => {
    expect(pluralRule08(1)).toBe(0);
    expect(pluralRule08('1')).toBe(0);
  });

  it('should return 2 form if value is 2 - 4', () => {
    expect(pluralRule08(2)).toBe(1);
    expect(pluralRule08(3)).toBe(1);
    expect(pluralRule08('4')).toBe(1);
  });

  it('should return 3 form for everything else ', () => {
    expect(pluralRule08()).toBe(2);
    expect(pluralRule08(0)).toBe(2);
    expect(pluralRule08('5')).toBe(2);
    expect(pluralRule08(11)).toBe(2);
    expect(pluralRule08(12)).toBe(2);
    expect(pluralRule08(13)).toBe(2);
    expect(pluralRule08(14)).toBe(2);
  });
});
