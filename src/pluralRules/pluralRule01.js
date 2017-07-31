// Families: Germanic (Danish, Dutch, English, Faroese, Frisian, German, Norwegian, Swedish),
// Finno-Ugric (Estonian, Finnish, Hungarian), Language isolate (Basque), Latin/Greek (Greek),
// Semitic (Hebrew), Romanic (Italian, Portuguese, Spanish, Catalan), Vietnamese
function pluralRule01(value) {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity)) return 1;
  return quantity === 1 ? 0 : 1;
}

export default pluralRule01;
