// Families: Slavic (Polish)
function pluralRule09(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 2;

  const lastDigit = quantity % 10;
  const lastTwoDigits = quantity % 100;

  if (
    quantity === 1
  ) return 0;
  else if (
    lastDigit >= 2 && lastDigit <= 4 &&
    lastTwoDigits !== 12 &&
    lastTwoDigits !== 13 &&
    lastTwoDigits !== 14
  ) return 1;

  return 2;
}

export default pluralRule09;
