/**
 * Convert the localization object into a function in case we need to support nested keys.
 *
 * @param {object} localization the language object,
 * @param {boolean} nested
 *
 * @returns {function}
 */
function makeLocalizeFunction(localization, nested) {
  return function localizeFunction(key) {
    return nested ? byString(localization, key) : localization[key];
  };
}

/**
 * Find the key if the key is a path expressed with dots
 *
 * e.g.
 * Code: __("errors.connectionError")
 * Lang: {"errors": {"connectionError": "There was an error connecting."}}
 * New Code: "There was an error connecting."
 *
 * @param {object} localization
 * @param {string} nestedKey The original key
 *
 * @returns {*}
 */
function byString(localization, nestedKey) {
  // strip a leading dot
  const stringKey = nestedKey.replace(/^\./, '');
  const keysArray = stringKey.split('.');

  // loop through the keys to find the nested value
  for (let i = 0, length = keysArray.length; i < length; ++i) {
    const key = keysArray[i];

    if (!(key in localization)) { return; }

    localization = localization[key];
  }

  return localization;
}

export default makeLocalizeFunction;
