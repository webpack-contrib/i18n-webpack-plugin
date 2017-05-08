import MissingLocalizationError from '../../src/MissingLocalizationError';
import processFile from '../test-cases.setup';

describe('options.failOnMissing', () => {
  it('should return translated keys', () => {
    const translations = {};
    const options = {
      failOnMissing: true,
    };

    expect.assertions(3);
    return processFile('opts-fail-on-missing.code.js', translations, options)
      .catch((err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err).toBeInstanceOf(MissingLocalizationError);
        expect(err.message).toBe('Missing localization: missing-key');
      });
  });
});
