import MissingLocalizationError from '../../src/MissingLocalizationError';
import processFile from '../test-cases.setup';

describe('opts-fail-on-missing', () => {
  it('should return translated keys', () => {
    const translations = {};
    const options = {
      failOnMissing: true,
    };

    expect.assertions(2);
    return processFile('opts-fail-on-missing.code.js', translations, options)
      .catch((er) => {
        expect(er).toBeInstanceOf(MissingLocalizationError);
        expect(er.message).toBe('Missing localization: missing-key');
      });
  });
});
