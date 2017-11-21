// Families: Semitic (Arabic)
function pluralRule12(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 5;

  const lastTwoDigits = quantity % 100;

  if (
    quantity === 0
  ) return 5;
  else if (
    quantity === 1
  ) return 0;
  else if (
    quantity === 2
  ) return 1;
  else if (
    lastTwoDigits >= 3 && lastTwoDigits <= 10
  ) return 2;
  else if (
    lastTwoDigits >= 0 && lastTwoDigits <= 2
  ) return 4;

  return 3;
}

export default pluralRule12;
