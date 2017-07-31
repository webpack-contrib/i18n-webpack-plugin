import pluralRule15 from '../../src/pluralRules/pluralRule15';

describe('pluralRule15', () => {
  it('should return 1 form if value ends in 1, excluding 11', () => {
    expect(pluralRule15(1)).toBe(0);
    expect(pluralRule15('1')).toBe(0);
    expect(pluralRule15(21)).toBe(0);
    expect(pluralRule15('21')).toBe(0);
    expect(pluralRule15(111)).toBe(0);
    expect(pluralRule15('111')).toBe(0);
  });

  it('should return 2 form for everything else', () => {
    expect(pluralRule15()).toBe(1);
    expect(pluralRule15(0)).toBe(1);
    expect(pluralRule15(11)).toBe(1);
  });
});
