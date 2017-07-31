import pluralRule10 from '../../src/pluralRules/pluralRule10';

describe('pluralRule10', () => {
  it('should return 1 form if value ends in 01', () => {
    expect(pluralRule10(1)).toBe(0);
    expect(pluralRule10('101')).toBe(0);
    expect(pluralRule10(201)).toBe(0);
  });

  it('should return 2 form if value ends in 02', () => {
    expect(pluralRule10(2)).toBe(1);
    expect(pluralRule10('102')).toBe(1);
    expect(pluralRule10(202)).toBe(1);
  });

  it('should return 3 form if value ends in 03 - 04', () => {
    expect(pluralRule10(3)).toBe(2);
    expect(pluralRule10(4)).toBe(2);
    expect(pluralRule10('103')).toBe(2);
    expect(pluralRule10('104')).toBe(2);
    expect(pluralRule10(203)).toBe(2);
    expect(pluralRule10(204)).toBe(2);
  });

  it('should return 4 form for everything else', () => {
    expect(pluralRule10()).toBe(3);
    expect(pluralRule10(0)).toBe(3);
    expect(pluralRule10(5)).toBe(3);
    expect(pluralRule10('21')).toBe(3);
    expect(pluralRule10(22)).toBe(3);
    expect(pluralRule10('23')).toBe(3);
    expect(pluralRule10('24')).toBe(3);
  });
});
