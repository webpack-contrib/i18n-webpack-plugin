'use strict';

const count = 3;
const param = 'p';

exports.dynamicTemplateKey = __(`${count} nights`);
exports.parametrizedTemplateKey = __(`${param} param`);
exports.staticKey = __('static');
