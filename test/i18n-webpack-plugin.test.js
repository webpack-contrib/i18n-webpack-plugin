import { name as PROJECT_NAME } from '../package.json';
import I18nPlugin from '../src';

describe(PROJECT_NAME, () => {
  test('should export the loader', (done) => {
    expect(I18nPlugin).toBeInstanceOf(Function);
    done();
  });
});
