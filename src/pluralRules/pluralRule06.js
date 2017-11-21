// Families: Baltic (Latvian, Lithuanian)
function pluralRule06(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 1;

  const lastDigit = quantity % 10;
  const lastTwoDigits = quantity % 100;

  if (
    lastDigit === 1 && lastTwoDigits !== 11
  ) return 0;
  else if (
    lastDigit === 0 ||
    (lastTwoDigits >= 11 && lastTwoDigits <= 19)
  ) return 1;

  return 2;
}

export default pluralRule06;
