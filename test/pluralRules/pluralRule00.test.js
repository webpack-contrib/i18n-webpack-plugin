import pluralRule00 from '../../src/pluralRules/pluralRule00';

describe('pluralRule00', () => {
  it('should return 1 form for any value', () => {
    expect(pluralRule00()).toBe(0);
    expect(pluralRule00(1)).toBe(0);
    expect(pluralRule00('2')).toBe(0);
  });
});
