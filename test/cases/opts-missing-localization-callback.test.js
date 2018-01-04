import processFile from '../cases.setup';

describe('options.missingLocalizationCallback', () => {
  it('should should call the callback once', () => {
    const translations = { 'existing-key': 'existing-value' };
    const missingLocalizationCallback = jest.fn();
    const options = {
      missingLocalizationCallback,
    };

    return processFile('opts-missing-localization-callback.code.js', translations, options)
    .then(() => expect(missingLocalizationCallback).toHaveBeenCalledTimes(1));
  });
});
