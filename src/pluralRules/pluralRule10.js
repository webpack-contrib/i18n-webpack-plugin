// Families: Slavic (Slovenian, Sorbian)
function pluralRule10(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 3;

  const lastTwoDigits = quantity % 100;

  if (
    lastTwoDigits === 1
  ) return 0;
  else if (
    lastTwoDigits === 2
  ) return 1;
  else if (
    lastTwoDigits === 3 ||
    lastTwoDigits === 4
  ) return 2;

  return 3;
}

export default pluralRule10;
