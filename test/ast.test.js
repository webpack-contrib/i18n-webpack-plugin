import { parse } from 'acorn';
import { isPluralExpression, serializeExpression } from '../src/ast';

describe('isPluralExpression', () => {
  it('should return `true` is case specified identifier is presented', () => {
    const ast = parse('count + \' nights\'');
    expect(isPluralExpression(ast.body[0], 'count')).toBe(true);
  });

  it('should return `false` is case specified identifier is not presented', () => {
    const ast = parse('count + \' nights\'');
    expect(isPluralExpression(ast.body[0], 'amount')).toBe(false);
  });
});

describe('serializeExpression', () => {
  it('should serialize binary expressions properly', () => {
    const ast = parse('count + \' nights\'');
    expect(serializeExpression(ast.body[0])).toBe('\'{count} nights\'');
  });

  it('should serialize nested binary expressions properly', () => {
    const ast = parse('\'foo \' + bar + \' baz\'');
    expect(serializeExpression(ast.body[0])).toBe('\'foo {bar} baz\'');
  });

  it('should serialize template literals properly', () => {
    const ast = parse('`${count} nights`'); // eslint-disable-line no-template-curly-in-string
    expect(serializeExpression(ast.body[0])).toBe('\'{count} nights\'');
  });

  it('should serialize nested template literals properly', () => {
    const ast = parse('`${ `foo ${bar}` } baz`'); // eslint-disable-line no-template-curly-in-string
    expect(serializeExpression(ast.body[0])).toBe('\'foo {bar} baz\'');
  });
});
