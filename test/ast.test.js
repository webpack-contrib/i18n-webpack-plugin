import { parse } from 'acorn';
import { serializeExpression } from '../src/ast';

describe('serializeExpression', () => {
  describe('identifiers', () => {
    it('should return all found identifiers', () => {
      const ast = parse(`'AA' + bb + 'CC' + dd + 'EE' + bb`); // eslint-disable-line quotes
      const expr = serializeExpression(ast.body[0]);

      expect(expr.identifiers).toEqual({
        bb: '{bb}',
        dd: '{dd}',
      });
    });
  });

  describe('plural', () => {
    it('should return `true` is case pluralIdentName was found', () => {
      const ast = parse(`foo + 'bar'`); // eslint-disable-line quotes
      const expr = serializeExpression(ast.body[0], 'foo');

      expect(expr.plural).toBe(true);
    });

    it('should return `false` is case pluralIdentName was not found', () => {
      const ast = parse(`foo + 'bar'`); // eslint-disable-line quotes
      const expr = serializeExpression(ast.body[0]);

      expect(expr.plural).toBe(false);
    });
  });

  describe('string', () => {
    it('should serialize binary expressions properly', () => {
      const ast = parse('count + \' nights\'');
      const expr = serializeExpression(ast.body[0]);

      expect(expr.string).toBe('{count} nights');
    });

    it('should serialize nested binary expressions properly', () => {
      const ast = parse('\'foo \' + bar + \' baz\'');
      const expr = serializeExpression(ast.body[0]);

      expect(expr.string).toBe('foo {bar} baz');
    });

    it('should serialize template literals properly', () => {
      const ast = parse('`${count} nights`'); // eslint-disable-line no-template-curly-in-string
      const expr = serializeExpression(ast.body[0]);

      expect(expr.string).toBe('{count} nights');
    });

    it('should serialize nested template literals properly', () => {
      const ast = parse('`${ `foo ${bar}` } baz`'); // eslint-disable-line no-template-curly-in-string
      const expr = serializeExpression(ast.body[0]);

      expect(expr.string).toBe('foo {bar} baz');
    });
  });

  describe('supported', () => {
    it('should set supported to `false` for call expressions', () => {
      const ast = parse('foo(bar)');
      const expr = serializeExpression(ast.body[0]);

      expect(expr.supported).toBe(false);
    });
  });
});
