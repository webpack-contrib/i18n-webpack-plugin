import { processFile, requireUncache } from '../test-cases.setup';

describe('apply-translations', () => {
  let translations;

  beforeAll(() => processFile('apply-translations.code.js')
    .then(({ file }) => {
      translations = requireUncache(file);
    }));

  it('should return translated keys', () => {
    expect(translations).toEqual({
      staticKey: 'static key',
    });
  });
});
