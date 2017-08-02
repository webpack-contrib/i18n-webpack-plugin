// @see https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals
export const formsNumber = {
  0: 1,
  1: 2,
  2: 2,
  4: 4,
  5: 3,
  6: 3,
  7: 3,
  8: 3,
  9: 3,
  10: 4,
  11: 5,
  12: 6,
  13: 4,
  14: 3,
  15: 2,
  16: 6,
};

/**
 *
 * @param  {string|string[]} forms
 * @param  {number} pluralRuleNumber
 * @return {string[]}
 */
export function buildForms(forms, pluralRuleNumber) {
  if (Array.isArray(forms)) {
    return forms;
  }

  return Array.from({ length: formsNumber[pluralRuleNumber] }, () => forms);
}

/**
 *
 * @param  {number}  pluralRuleNumber
 * @return {boolean}
 */
export function isValidRuleNumber(pluralRuleNumber) {
  return Object.prototype.hasOwnProperty.call(formsNumber, pluralRuleNumber);
}
