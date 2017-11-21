import pluralRule04 from '../../src/pluralRules/pluralRule04';

describe('pluralRule04', () => {
  it('should return 1 form if value is 1 or 11', () => {
    expect(pluralRule04(1)).toBe(0);
    expect(pluralRule04('1')).toBe(0);
    expect(pluralRule04(11)).toBe(0);
    expect(pluralRule04('11')).toBe(0);
  });

  it('should return 2 form if value is 2 or 12', () => {
    expect(pluralRule04(2)).toBe(1);
    expect(pluralRule04('2')).toBe(1);
    expect(pluralRule04(12)).toBe(1);
    expect(pluralRule04('12')).toBe(1);
  });

  it('should return 3 form if value is 3 - 10 or 13 - 19', () => {
    expect(pluralRule04(3)).toBe(2);
    expect(pluralRule04('3')).toBe(2);
    expect(pluralRule04(6)).toBe(2);
    expect(pluralRule04('6')).toBe(2);
    expect(pluralRule04(10)).toBe(2);
    expect(pluralRule04('10')).toBe(2);
    expect(pluralRule04(13)).toBe(2);
    expect(pluralRule04('13')).toBe(2);
    expect(pluralRule04(16)).toBe(2);
    expect(pluralRule04('16')).toBe(2);
    expect(pluralRule04(19)).toBe(2);
    expect(pluralRule04('19')).toBe(2);
  });

  it('should return 4 form for everything else', () => {
    expect(pluralRule04()).toBe(3);
    expect(pluralRule04(0)).toBe(3);
    expect(pluralRule04(20)).toBe(3);
    expect(pluralRule04('21')).toBe(3);
  });
});
