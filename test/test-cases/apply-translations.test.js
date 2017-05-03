import { processFile, requireUncache } from '../test-cases.setup';

describe('apply-translations', () => {
  let translated;

  beforeAll(() => {
    const translations = {
      'static-key': 'translated static key',
    };

    return processFile('apply-translations.code.js', translations)
      .then(({ file }) => {
        translated = requireUncache(file);
      });
  });

  it('should return translated keys', () => {
    expect(translated).toEqual({
      missingKey: 'missing-key',
      staticKey: 'translated static key',
    });
  });
});
