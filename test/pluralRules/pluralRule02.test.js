import pluralRule02 from '../../src/pluralRules/pluralRule02';

describe('pluralRule02', () => {
  it('should return 1 form if value is 0 or 1', () => {
    expect(pluralRule02()).toBe(0);
    expect(pluralRule02(0)).toBe(0);
    expect(pluralRule02('0')).toBe(0);
    expect(pluralRule02(1)).toBe(0);
    expect(pluralRule02('1')).toBe(0);
  });

  it('should return 2 form for everything else', () => {
    expect(pluralRule02(2)).toBe(1);
    expect(pluralRule02('3')).toBe(1);
  });
});
