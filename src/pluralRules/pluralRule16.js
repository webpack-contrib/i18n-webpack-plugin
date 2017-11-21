// Families: Celtic (Breton)
function pluralRule16(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 5;

  const lastDigit = quantity % 10;
  const lastTwoDigits = quantity % 100;
  const isMillionLike = quantity % 1e6 === 0;

  if (
    quantity === 1
  ) return 0;
  else if (
    lastDigit === 1 &&
    lastTwoDigits !== 11 &&
    lastTwoDigits !== 71 &&
    lastTwoDigits !== 91
  ) return 1;
  else if (
    lastDigit === 2 &&
    lastTwoDigits !== 12 &&
    lastTwoDigits !== 72 &&
    lastTwoDigits !== 92
  ) return 2;
  else if (
    (
      lastDigit === 3 &&
      lastTwoDigits !== 13 &&
      lastTwoDigits !== 73 &&
      lastTwoDigits !== 93
    ) || (
      lastDigit === 4 &&
      lastTwoDigits !== 14 &&
      lastTwoDigits !== 74 &&
      lastTwoDigits !== 94
    ) || (
      lastDigit === 9 &&
      lastTwoDigits !== 19 &&
      lastTwoDigits !== 79 &&
      lastTwoDigits !== 99
    )
  ) return 3;
  else if (
    isMillionLike && quantity !== 0
  ) return 4;

  return 5;
}

export default pluralRule16;
