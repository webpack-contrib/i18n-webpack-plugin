import pluralRule01 from '../../src/pluralRules/pluralRule01';

describe('pluralRule01', () => {
  it('should return 1 form if value is 1', () => {
    expect(pluralRule01(1)).toBe(0);
    expect(pluralRule01('1')).toBe(0);
  });

  it('should return 2 form for everything else', () => {
    expect(pluralRule01()).toBe(1);
    expect(pluralRule01(0)).toBe(1);
    expect(pluralRule01('2')).toBe(1);
  });
});
