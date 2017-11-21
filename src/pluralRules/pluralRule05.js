// Families: Romanic (Romanian)
function pluralRule05(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 1;

  const lastTwoDigits = quantity % 100;

  if (
    quantity === 1
  ) return 0;
  else if (
    quantity === 0 ||
    (lastTwoDigits >= 1 && lastTwoDigits <= 19)
  ) return 1;

  return 2;
}

export default pluralRule05;
