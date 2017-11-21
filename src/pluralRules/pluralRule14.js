// Families: Slavic (Macedonian)
function pluralRule14(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 2;

  const lastDigit = quantity % 10;

  if (
    lastDigit === 1
  ) return 0;
  else if (
    lastDigit === 2
  ) return 1;

  return 2;
}

export default pluralRule14;
