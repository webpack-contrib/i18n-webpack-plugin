'use strict';

// Families: Celtic (Breton)
module.exports = function pluralForm16(value) {
  var quantity = parseInt(value, 10);

  if (isNaN(quantity)) return 0;

  var lastDigits = quantity % 1e7;

  if (
    quantity === 1
  ) return 0;
  else if (
    lastDigits === 1 &&
    quantity !== 11 &&
    quantity !== 71 &&
    quantity !== 91
  ) return 1;
  else if (
    lastDigits === 2 &&
    quantity !== 12 &&
    quantity !== 72 &&
    quantity !== 92
  ) return 2;
  else if (
    (
      lastDigits === 2 ||
      lastDigits === 3 ||
      lastDigits === 9
    ) &&
    quantity !== 13 &&
    quantity !== 14 &&
    quantity !== 19 &&
    quantity !== 73 &&
    quantity !== 74 &&
    quantity !== 79 &&
    quantity !== 93 &&
    quantity !== 94 &&
    quantity !== 99
  ) return 3;
  else if (
    lastDigits === 0 &&
    quantity / 1e7 > 0
  ) return 4;

  return 5;
};

module.exports.forms = 6;
