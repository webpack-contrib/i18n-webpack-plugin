/**
 * Convert the localization object into a function in case we need to support nested keys.
 *
 * @param {Object} localization the language object,
 * @param {Boolean} nested
 *
 * @returns {Function}
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
 * @param {Object} localization
 * @param {String} nestedKey The original key
 *
 * @returns {*}
 */
function byString(localization, nestedKey) {
  // remove a leading dot and split by dot
  const keys = nestedKey.replace(/^\./, '').split('.');

  // loop through the keys to find the nested value
  for (let i = 0, length = keys.length; i < length; ++i) {
    const key = keys[i];

    if (!(key in localization)) { return; }

    localization = localization[key];
  }

  return localization;
}

export default makeLocalizeFunction;
