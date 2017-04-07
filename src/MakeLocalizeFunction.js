/**
 *
 * @param {object}  localization
 * @returns {Function}
 */
function makeLocalizeFunction(localization, nested) {
  return function localizeFunction(key) {
    return nested ? byString(localization, key) : localization[key];
  };
}

/**
 *
 * @param {object}  localization
 * @param {string}  string key
 * @returns {*}
 */
function byString(object, string) {
  // strip a leading dot
  const stringKey = string.replace(/^\./, '');

  const keysArray = stringKey.split('.');
  for (let i = 0, length = keysArray.length; i < length; ++i) {
    const key = keysArray[i];

    if (!(key in object)) return;

    object = object[key];
  }

  return object;
}

export default makeLocalizeFunction;
