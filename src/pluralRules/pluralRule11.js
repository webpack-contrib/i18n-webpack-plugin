// Families: Celtic (Irish Gaelic)
function pluralRule11(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 4;

  if (
    quantity === 1
  ) return 0;
  else if (
    quantity === 2
  ) return 1;
  else if (
    quantity >= 3 && quantity <= 6
  ) return 2;
  else if (
    quantity >= 7 && quantity <= 10
  ) return 3;

  return 4;
}

export default pluralRule11;
