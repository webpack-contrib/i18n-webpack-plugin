'use strict';

module.exports = function getType(value) {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';

  return typeof value;
};
