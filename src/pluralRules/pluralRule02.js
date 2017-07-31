// Families: Romanic (French, Brazilian Portuguese)
function pluralRule02(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 0;
  return quantity === 0 || quantity === 1 ? 0 : 1;
}

export default pluralRule02;
