// Families: Slavic (Belarusian, Bosnian, Croatian, Serbian, Russian, Ukrainian)
function pluralRule07(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 2;

  const lastDigit = quantity % 10;
  const lastTwoDigits = quantity % 100;

  if (
    lastDigit === 1 && lastTwoDigits !== 11
  ) return 0;
  else if (
    lastDigit >= 2 && lastDigit <= 4 &&
    lastTwoDigits !== 12 &&
    lastTwoDigits !== 13 &&
    lastTwoDigits !== 14
  ) return 1;

  return 2;
}

export default pluralRule07;
