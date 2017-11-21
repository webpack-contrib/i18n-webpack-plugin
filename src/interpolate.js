function createInterpolateFn(pluralFormFn) {
  function interpolate(forms, pairs, count) {
    let translation = Array.isArray(forms) ? forms[pluralFormFn(count)] : forms;

    Object.keys(pairs).forEach((param) => {
      translation = translation.replace(new RegExp(param, 'g'), pairs[param]);
    });

    return translation;
  }

  return interpolate;
}

export default createInterpolateFn;
