import processFile from '../test-cases.setup';

describe('options.functionName', () => {
  describe('the object notation', () => {
    let translated;

    beforeAll(() => {
      const translations = {
        key: 'translated key',
      };
      const options = {
        functionName: 'i18n',
      };

      return processFile('opts-function-name.code.js', translations, options)
        .then(({ file }) => {
          translated = require.requireActual(file);
        });
    });

    it('should return translated keys', () => {
      expect(translated).toMatchSnapshot();
    });
  });

  describe('the string notation', () => {
    let translated;

    beforeAll(() => {
      const translations = {
        key: 'translated key',
      };
      const options = 'i18n';

      return processFile('opts-function-name.code.js', translations, options)
        .then(({ file }) => {
          translated = require.requireActual(file);
        });
    });

    it('should return translated keys', () => {
      expect(translated).toMatchSnapshot();
    });
  });
});
