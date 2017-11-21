import { buildForms, isValidRuleNumber } from '../src/pluralForms';

describe('buildForms', () => {
  it('should not modify arrays', () => {
    const forms = ['a', 'a', 'a'];
    expect(buildForms(forms, 7)).toBe(forms);
  });

  it('should return array of forms for entry string', () => {
    expect(buildForms('abc', 0)).toEqual(['abc']);
    expect(buildForms('abc', 7)).toEqual(['abc', 'abc', 'abc']);
  });
});

describe('isValidRuleNumber', () => {
  it('should return `true` for existing rule number', () => {
    expect(isValidRuleNumber(7)).toBe(true);
  });

  it('should return `false` for not existing rule number', () => {
    expect(isValidRuleNumber(3)).toBe(false);
  });
});
