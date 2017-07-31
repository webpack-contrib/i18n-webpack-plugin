import pluralRule11 from '../../src/pluralRules/pluralRule11';

describe('pluralRule11', () => {
  it('should return 1 form if value is 1', () => {
    expect(pluralRule11(1)).toBe(0);
    expect(pluralRule11('1')).toBe(0);
  });

  it('should return 2 form if value is 2', () => {
    expect(pluralRule11(2)).toBe(1);
    expect(pluralRule11('2')).toBe(1);
  });

  it('should return 3 form if value is 3 - 6', () => {
    expect(pluralRule11(3)).toBe(2);
    expect(pluralRule11(4)).toBe(2);
    expect(pluralRule11(5)).toBe(2);
    expect(pluralRule11('6')).toBe(2);
  });

  it('should return 4 form if value is 7 - 10', () => {
    expect(pluralRule11(7)).toBe(3);
    expect(pluralRule11(8)).toBe(3);
    expect(pluralRule11(9)).toBe(3);
    expect(pluralRule11('10')).toBe(3);
  });

  it('should return 5 form for everything else', () => {
    expect(pluralRule11()).toBe(4);
    expect(pluralRule11(0)).toBe(4);
    expect(pluralRule11('11')).toBe(4);
  });
});
