// Families: Slavic (Slovak, Czech)
function pluralRule08(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 2;

  if (
    quantity === 1
  ) return 0;
  else if (
    quantity === 2 ||
    quantity === 3 ||
    quantity === 4
  ) return 1;

  return 2;
}

export default pluralRule08;
