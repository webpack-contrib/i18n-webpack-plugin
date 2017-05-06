import processFile from '../test-cases.setup';

describe('apply-translations', () => {
  let translated;

  beforeAll(() => {
    const translations = {
      'static-key': 'translated static key',
    };

    return processFile('apply-translations.code.js', translations)
      .then(({ file }) => {
        translated = require.requireActual(file);
      });
  });

  it('should return translated keys', () => {
    expect(translated).toEqual({
      defaults: 'default value',
      missingKey: 'missing-key2',
      staticKey: 'translated static key',
    });
  });
});
