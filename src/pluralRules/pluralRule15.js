// Families: Icelandic
function pluralRule15(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 1;

  const lastDigit = quantity % 10;

  if (
    lastDigit === 1 && quantity !== 11
  ) return 0;

  return 1;
}

export default pluralRule15;
