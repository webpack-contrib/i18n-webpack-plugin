import pluralRule12 from '../../src/pluralRules/pluralRule12';

describe('pluralRule12', () => {
  it('should return 1 form if value is 1', () => {
    expect(pluralRule12(1)).toBe(0);
    expect(pluralRule12('1')).toBe(0);
  });

  it('should return 2 form if value is 2', () => {
    expect(pluralRule12(2)).toBe(1);
    expect(pluralRule12('2')).toBe(1);
  });

  it('should return 3 form if value ends in 03 - 10', () => {
    expect(pluralRule12(3)).toBe(2);
    expect(pluralRule12(9)).toBe(2);
    expect(pluralRule12(10)).toBe(2);
    expect(pluralRule12('103')).toBe(2);
    expect(pluralRule12('109')).toBe(2);
    expect(pluralRule12('110')).toBe(2);
  });

  it('should return 4 form if value everything else but is 0 and ends in 00 - 02, excluding 0-2', () => {
    expect(pluralRule12(11)).toBe(3);
    expect(pluralRule12(12)).toBe(3);
    expect(pluralRule12(13)).toBe(3);
    expect(pluralRule12('20')).toBe(3);
    expect(pluralRule12('39')).toBe(3);
  });

  it('should return 5 form if value ends in 00 - 02, excluding 0 - 2', () => {
    expect(pluralRule12(100)).toBe(4);
    expect(pluralRule12(101)).toBe(4);
    expect(pluralRule12(102)).toBe(4);
    expect(pluralRule12('200')).toBe(4);
    expect(pluralRule12('201')).toBe(4);
    expect(pluralRule12('202')).toBe(4);
  });

  it('should return 6 form if value is 0', () => {
    expect(pluralRule12()).toBe(5);
    expect(pluralRule12(0)).toBe(5);
    expect(pluralRule12('0')).toBe(5);
  });
});
