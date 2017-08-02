import processFile from '../cases.setup';

describe('apply-translations', () => {
  let translated;

  beforeAll(() => {
    const translations = {
      'static-key': 'translated static key',
      '{count} nights': [
        '{count} ночь',
        '{count} ночи',
        '{count} ночей',
      ],
    };

    return processFile('apply-translations.code.js', translations, { pluralRuleNumber: 7 })
      .then(({ file }) => {
        translated = require.requireActual(file);
      });
  });

  it('should return translated keys', () => {
    expect(translated).toMatchSnapshot();
  });
});
