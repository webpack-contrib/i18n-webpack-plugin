// Families: Celtic (Scottish Gaelic)
function pluralRule04(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 3;

  if (
    quantity === 1 ||
    quantity === 11
  ) return 0;
  else if (
    quantity === 2 ||
    quantity === 12
  ) return 1;
  else if (
    (quantity >= 3 && quantity <= 10) ||
    (quantity >= 13 && quantity <= 19)
  ) return 2;

  return 3;
}

export default pluralRule04;
