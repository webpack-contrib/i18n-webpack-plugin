import makeLocalizeFunction from '../src/MakeLocalizeFunction';

describe('MakeLocalizeFunction', () => {
  describe('with nested support', () => {
    let localize;

    beforeEach(() => {
      const nested = true;
      const translations = {
        'a.b.c': 'bar',
        a: {
          b: {
            c: 'Foo',
          },
        },
      };

      localize = makeLocalizeFunction(translations, nested);
    });

    it('should return `Foo` for `a.b.c`', () => {
      expect(localize('a.b.c')).toEqual('Foo');
    });

    it('should return `undefined` for the missing translation', () => {
      expect(localize('the missing translation')).toEqual(undefined); // eslint-disable-line no-undefined
    });
  });

  describe('without nested support', () => {
    let localize;

    beforeEach(() => {
      const nested = false;
      const translations = {
        'a.b.c': 'bar',
        a: {
          b: {
            c: 'Foo',
          },
        },
      };

      localize = makeLocalizeFunction(translations, nested);
    });

    it('should return `bar` for `a.b.c`', () => {
      expect(localize('a.b.c')).toEqual('bar');
    });

    it('should return `undefined` for the missing translation', () => {
      expect(localize('the missing translation')).toEqual(undefined); // eslint-disable-line no-undefined
    });
  });
});
